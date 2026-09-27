#!/usr/bin/env node

import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

const ROOT_FILES = new Set([
  ".gitignore",
  ".nvmrc",
  "astro.config.mjs",
  "package-lock.json",
  "package.json",
  "playwright.config.ts",
  "tsconfig.json",
]);
const REQUIRED_FILES = new Set([
  ".gitignore",
  ".nvmrc",
  "astro.config.mjs",
  "package-lock.json",
  "package.json",
  "scripts/verify-scope.mjs",
  "src/pages/index.astro",
  "src/styles/global.css",
  "tsconfig.json",
]);
const ALLOWED_DIRECTORIES = new Set([
  "scripts",
  "src",
  "src/pages",
  "src/styles",
  "tests",
]);
const IGNORED_GENERATED_ROOTS = new Set([
  ".astro",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const LOCK_ROOT_DEPENDENCIES = {
  "@astrojs/check": "0.9.10",
  "@axe-core/playwright": "4.13.0",
  "@playwright/test": "1.63.0",
  astro: "7.3.5",
  typescript: "6.0.3",
};
const EXPECTED_SCRIPTS = {
  dev: "astro dev",
  check: "astro check",
  "test:scope:source": "node scripts/verify-scope.mjs --source",
  "test:scope:output": "node scripts/verify-scope.mjs --output",
  "test:a11y": "playwright test",
  build: "astro build",
  preview: "astro preview",
  "playwright:install:chromium": "playwright install chromium",
};
const EXPECTED_GITIGNORE = [
  "node_modules/",
  "dist/",
  ".astro/",
  ".env*",
  "playwright-report/",
  "test-results/",
  "*.log",
].join("\n");
const EXPECTED_ASTRO_CONFIG = `import { defineConfig } from "astro/config";\n\nexport default defineConfig({\n  output: "static",\n  build: {\n    inlineStylesheets: "never",\n  },\n});\n`;
const EXPECTED_TSCONFIG = {
  extends: "astro/tsconfigs/strict",
  include: [".astro/types.d.ts", "**/*"],
  exclude: ["dist"],
};
const SOURCE_CSS_SHA256 = "6b5170ac574c87cad8d0b9619fa2b9127d9ba8a08bde7e42dc17404d61f68fde";
const BUILT_CSS_SHA256 = "a30dfeff5a3ef0011c970fb06a4c09cbffcbcd2c9657c8d677950e8d33012455";
const EXPECTED_TEXT = {
  skip: "Skip to main content",
  title: "Local foundation demonstration",
  disclosure: "Synthetic demonstration content — not an agency website or client work.",
  detail: "This local page verifies the static Astro shell only.",
};
const VOID_ELEMENTS = new Set(["meta", "link"]);

function fail(message) {
  throw new Error(message);
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])]),
    );
  }
  return value;
}

function assertEqual(actual, expected, label) {
  if (JSON.stringify(stable(actual)) !== JSON.stringify(stable(expected))) {
    fail(`${label} is not on the approved allowlist`);
  }
}

async function readRequired(root, relativePath) {
  const filePath = path.join(root, relativePath);
  let info;
  try {
    info = await lstat(filePath);
  } catch {
    fail(`required input is missing or unreadable: ${relativePath}`);
  }
  if (!info.isFile() || info.isSymbolicLink()) {
    fail(`required input is not a regular file: ${relativePath}`);
  }
  try {
    return await readFile(filePath, "utf8");
  } catch {
    fail(`required input is missing or unreadable: ${relativePath}`);
  }
}

async function verifyTree(root) {
  const seenFiles = new Set();

  async function walk(directory, relativeDirectory = "") {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch {
      fail(`source directory is missing or unreadable: ${relativeDirectory || "."}`);
    }

    for (const entry of entries) {
      const relativePath = relativeDirectory
        ? `${relativeDirectory}/${entry.name}`
        : entry.name;
      const absolutePath = path.join(directory, entry.name);
      let info;
      try {
        info = await lstat(absolutePath);
      } catch {
        fail(`source entry is missing or unreadable: ${relativePath}`);
      }
      if (info.isSymbolicLink()) {
        fail(`symbolic links are not allowed in source scope: ${relativePath}`);
      }

      if (!relativeDirectory && IGNORED_GENERATED_ROOTS.has(entry.name)) {
        if (!info.isDirectory()) {
          fail(`generated/dependency path is not a directory: ${relativePath}`);
        }
        continue;
      }

      if (ROOT_FILES.has(relativePath) || REQUIRED_FILES.has(relativePath) ||
          relativePath === "playwright.config.ts" ||
          relativePath === "tests/foundation-accessibility.spec.ts") {
        if (!info.isFile()) {
          fail(`allowlisted source path is not a regular file: ${relativePath}`);
        }
        seenFiles.add(relativePath);
        continue;
      }

      if (ALLOWED_DIRECTORIES.has(relativePath)) {
        if (!info.isDirectory()) {
          fail(`allowlisted source directory is not a directory: ${relativePath}`);
        }
        await walk(absolutePath, relativePath);
        continue;
      }

      fail(`unapproved file or directory in site source scope: ${relativePath}`);
    }
  }

  await walk(root);
  for (const relativePath of REQUIRED_FILES) {
    if (!seenFiles.has(relativePath)) {
      fail(`required source file is missing: ${relativePath}`);
    }
  }
}

function decodeText(text) {
  if (text.includes("&")) fail("HTML entities or malformed text are not approved in copy");
  return text.replace(/[\t\r\n ]+/g, " ").trim();
}

function parseAttributes(raw, label) {
  const attributes = {};
  let position = 0;
  const attributePattern = /\s+([a-z][a-z0-9:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/y;

  while (position < raw.length) {
    if (/^\s*$/.test(raw.slice(position))) break;
    attributePattern.lastIndex = position;
    const match = attributePattern.exec(raw);
    if (!match) fail(`malformed or unrecognized HTML attribute in ${label}`);
    const name = match[1].toLowerCase();
    if (Object.hasOwn(attributes, name)) fail(`duplicate HTML attribute in ${label}`);
    const value = match[2] ?? match[3] ?? "";
    if (value.includes("&")) fail(`encoded HTML attribute is not approved in ${label}`);
    attributes[name] = value;
    position = attributePattern.lastIndex;
  }
  return attributes;
}

function parseMarkup(markup, label) {
  const events = [];
  const stack = [];
  let position = 0;

  while (position < markup.length) {
    if (markup[position] !== "<") {
      const nextTag = markup.indexOf("<", position);
      const end = nextTag === -1 ? markup.length : nextTag;
      const text = decodeText(markup.slice(position, end));
      if (text) events.push({ type: "text", value: text });
      position = end;
      continue;
    }

    const nextTag = markup.indexOf(">", position + 1);
    if (nextTag === -1) fail(`unclosed HTML token in ${label}`);
    const raw = markup.slice(position, nextTag + 1);
    position = nextTag + 1;

    if (/^<!doctype\s+html\s*>$/i.test(raw)) {
      events.push({ type: "doctype", value: "html" });
      continue;
    }
    if (raw.startsWith("<!--") || raw.startsWith("<!") || raw.startsWith("<?")) {
      fail(`comments, declarations, and processing instructions are not approved in ${label}`);
    }

    const closeMatch = /^<\/([a-z][a-z0-9:-]*)\s*>$/i.exec(raw);
    if (closeMatch) {
      const tag = closeMatch[1].toLowerCase();
      if (stack.pop() !== tag) fail(`malformed HTML nesting in ${label}`);
      events.push({ type: "close", tag });
      continue;
    }

    const openMatch = /^<([a-z][a-z0-9:-]*)([\s\S]*?)\s*\/?>$/i.exec(raw);
    if (!openMatch) fail(`malformed or unrecognized HTML in ${label}`);
    const tag = openMatch[1].toLowerCase();
    let attributeText = openMatch[2];
    if (/\/\s*$/.test(attributeText)) attributeText = attributeText.replace(/\/\s*$/, "");
    const attributes = parseAttributes(attributeText, label);
    events.push({ type: "open", tag, attributes: stable(attributes) });
    if (!VOID_ELEMENTS.has(tag)) stack.push(tag);
  }

  if (stack.length !== 0) fail(`unclosed HTML element in ${label}`);
  return events;
}

function element(type, tag, attributes = {}) {
  return { type, tag, attributes: stable(attributes) };
}

function text(value) {
  return { type: "text", value };
}

function assertNoForbiddenPageMarkup(markup, label) {
  if (/<\s*(?:form|input|button|textarea|select|option|fieldset)\b/i.test(markup) ||
      /\b(?:action|formaction)\s*=/i.test(markup)) {
    fail(`forms and data-submission controls are prohibited in ${label}`);
  }
  if (/(?:https?:)?\/\/[^\s"'<>]+|\b(?:mailto|tel):/i.test(markup)) {
    fail(`external, contact, or protocol-relative URLs are prohibited in ${label}`);
  }
  if (/<\s*script\b|\bclient:(?:load|idle|visible|media|only)\b|\son[a-z]+\s*=/i.test(markup)) {
    fail(`client scripts and event handlers are prohibited in ${label}`);
  }
  if (/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(|\bdocument\.cookie\b|\b(?:localStorage|sessionStorage)\b/i.test(markup)) {
    fail(`network, cookie, and session behavior is prohibited in ${label}`);
  }
}

function expectedMarkupEvents(stylesheetHref = null) {
  const events = [
    { type: "doctype", value: "html" },
    element("open", "html", { lang: "en" }),
    element("open", "head"),
    element("open", "meta", { charset: "utf-8" }),
    element("open", "meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    element("open", "meta", { name: "robots", content: "noindex,nofollow" }),
    element("open", "title"),
    text(EXPECTED_TEXT.title),
    { type: "close", tag: "title" },
  ];
  if (stylesheetHref) {
    events.push(element("open", "link", { rel: "stylesheet", href: stylesheetHref }));
  }
  events.push(
    { type: "close", tag: "head" },
    element("open", "body"),
    element("open", "header"),
    element("open", "a", { class: "skip-link", href: "#main-content" }),
    text(EXPECTED_TEXT.skip),
    { type: "close", tag: "a" },
    { type: "close", tag: "header" },
    element("open", "main", { id: "main-content", tabindex: "-1" }),
    element("open", "h1"),
    text(EXPECTED_TEXT.title),
    { type: "close", tag: "h1" },
    element("open", "p"),
    text(EXPECTED_TEXT.disclosure),
    { type: "close", tag: "p" },
    element("open", "p"),
    text(EXPECTED_TEXT.detail),
    { type: "close", tag: "p" },
    { type: "close", tag: "main" },
    element("open", "footer"),
    { type: "close", tag: "footer" },
    { type: "close", tag: "body" },
    { type: "close", tag: "html" },
  );
  return events;
}

function parseSourcePage(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) fail("page must contain the approved Astro frontmatter and one static document");
  if (match[1].trim() !== 'import "../styles/global.css";') {
    fail("page imports or Astro frontmatter are not on the approved allowlist");
  }
  assertNoForbiddenPageMarkup(match[2], "src/pages/index.astro");
  const events = parseMarkup(match[2], "src/pages/index.astro");
  assertEqual(events, expectedMarkupEvents(), "source page markup, metadata, and visible/accessibility text");
}

function checkForbiddenPackageNames(lock) {
  const forbidden = /(?:^|\/)(?:@astrojs\/(?:adapter-[^/]+|mdx|vercel|netlify|cloudflare|node|deno)|@(?:mdx-js|sanity|storyblok|contentful|keystone|tinacms|decap|keystatic|payloadcms|strapi|ghost)\/|(?:react|react-dom|preact|vue|svelte|solid-js|qwik|lit|angular|mdx|contentlayer|@content-collections|nodemailer|resend|mailgun|sendgrid|wrangler|netlify|vercel|firebase-tools|cloudflare)\b)/i;
  for (const name of Object.keys(lock.packages ?? {})) {
    if (name && forbidden.test(name.replace(/^node_modules\//, ""))) {
      fail(`prohibited integration, CMS/editor, framework, adapter, or host package in lockfile: ${name}`);
    }
  }
}

async function verifySource(root) {
  const packageText = await readRequired(root, "package.json");
  const lockText = await readRequired(root, "package-lock.json");
  const ignoreText = await readRequired(root, ".gitignore");
  const nvmrc = await readRequired(root, ".nvmrc");
  const astroConfig = await readRequired(root, "astro.config.mjs");
  const tsconfigText = await readRequired(root, "tsconfig.json");
  const page = await readRequired(root, "src/pages/index.astro");
  const css = await readRequired(root, "src/styles/global.css");

  let manifest;
  let lock;
  let tsconfig;
  try {
    manifest = JSON.parse(packageText);
    lock = JSON.parse(lockText);
    tsconfig = JSON.parse(tsconfigText);
  } catch {
    fail("package manifest, lockfile, or TypeScript configuration is invalid JSON");
  }

  assertEqual(
    manifest,
    {
      name: "route-neutral-astro-foundation",
      version: "0.1.0",
      private: true,
      type: "module",
      engines: { node: ">=22.12.0" },
      scripts: EXPECTED_SCRIPTS,
      devDependencies: LOCK_ROOT_DEPENDENCIES,
    },
    "package manifest, scripts, and direct dependencies",
  );
  if (!["24.21.0", "24.21.0\n", "24.21.0\r\n"].includes(nvmrc)) {
    fail(".nvmrc must contain the single approved exact Node version 24.21.0");
  }
  if (ignoreText !== EXPECTED_GITIGNORE && ignoreText !== EXPECTED_GITIGNORE + String.fromCharCode(10)) {
    fail("site/.gitignore is not the approved generated-output and local-environment ignore list");
  }
  if (astroConfig !== EXPECTED_ASTRO_CONFIG) {
    fail("Astro configuration is not the approved static-only configuration");
  }
  assertEqual(tsconfig, EXPECTED_TSCONFIG, "strict TypeScript configuration");

  assertEqual(
    {
      name: lock.name,
      version: lock.version,
      lockfileVersion: lock.lockfileVersion,
      requires: lock.requires,
      root: lock.packages?.[""] ?? null,
      topLevelKeys: Object.keys(lock).sort(),
    },
    {
      name: "route-neutral-astro-foundation",
      version: "0.1.0",
      lockfileVersion: 3,
      requires: true,
      root: {
        name: "route-neutral-astro-foundation",
        version: "0.1.0",
        devDependencies: LOCK_ROOT_DEPENDENCIES,
        engines: { node: ">=22.12.0" },
      },
      topLevelKeys: ["lockfileVersion", "name", "packages", "requires", "version"],
    },
    "npm lockfile version and root dependency metadata",
  );
  if (!lock.packages || Object.keys(lock.packages).length < 2) {
    fail("npm lockfile does not contain an installed dependency graph");
  }
  checkForbiddenPackageNames(lock);

  const sourceDigest = createHash("sha256").update(css).digest("hex");
  if (sourceDigest !== SOURCE_CSS_SHA256) {
    fail("source stylesheet differs from the approved local style fixture");
  }
  parseSourcePage(page);
  await verifyTree(root);
}

async function walkOutput(directory, relativeDirectory = "") {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    fail(`built output directory is missing or unreadable: ${relativeDirectory || "dist"}`);
  }
  const files = [];
  const directories = [];
  for (const entry of entries) {
    const relativePath = relativeDirectory
      ? `${relativeDirectory}/${entry.name}`
      : entry.name;
    const absolutePath = path.join(directory, entry.name);
    let info;
    try {
      info = await lstat(absolutePath);
    } catch {
      fail(`built output entry is missing or unreadable: ${relativePath}`);
    }
    if (info.isSymbolicLink()) fail(`symbolic links are not allowed in built output: ${relativePath}`);
    if (info.isDirectory()) {
      directories.push(relativePath);
      const childInventory = await walkOutput(absolutePath, relativePath);
      files.push(...childInventory.files);
      directories.push(...childInventory.directories);
    } else if (info.isFile()) {
      files.push(relativePath);
    } else {
      fail(`unsupported filesystem entry in built output: ${relativePath}`);
    }
  }
  return { files, directories };
}

async function verifyOutput(root) {
  const dist = path.join(root, "dist");
  let distInfo;
  try {
    distInfo = await lstat(dist);
  } catch {
    fail("built output is missing; run npm run build before --output");
  }
  if (!distInfo.isDirectory() || distInfo.isSymbolicLink()) {
    fail("built output must be a real site/dist directory");
  }

  const inventory = await walkOutput(dist);
  const htmlFiles = inventory.files.filter((file) => file === "index.html");
  const cssFiles = inventory.files.filter((file) => /^_astro\/index\.[A-Za-z0-9_-]+\.css$/.test(file));
  if (htmlFiles.length !== 1 || cssFiles.length !== 1 ||
      inventory.files.length !== 2 || inventory.directories.length !== 1 ||
      inventory.directories[0] !== "_astro") {
    fail("built output contains an unexpected route, file, asset, or directory");
  }

  const html = await readRequired(dist, "index.html");
  const cssRelativePath = cssFiles[0];
  const cssFile = await readRequired(dist, cssRelativePath);
  const cssDigest = createHash("sha256").update(cssFile).digest("hex");
  if (cssDigest !== BUILT_CSS_SHA256) {
    fail("built stylesheet differs from the approved local style fixture");
  }

  const events = parseMarkup(html, "dist/index.html");
  const stylesheetEvents = events.filter(
    (event) => event.type === "open" && event.tag === "link" && event.attributes.rel === "stylesheet",
  );
  if (stylesheetEvents.length !== 1) {
    fail("built HTML must reference exactly one local stylesheet");
  }
  const stylesheetHref = stylesheetEvents[0].attributes.href;
  const expectedHref = `/${cssRelativePath}`;
  if (stylesheetHref !== expectedHref || !/^\/_astro\/index\.[A-Za-z0-9_-]+\.css$/.test(stylesheetHref)) {
    fail("built HTML contains an external or unapproved resource reference");
  }
  assertEqual(events, expectedMarkupEvents(stylesheetHref), "built document, route, metadata, resources, and rendered copy");
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !["--source", "--output"].includes(args[0])) {
    fail("use exactly one mode: --source or --output");
  }

  const root = path.resolve(process.cwd());
  if (path.basename(root) !== "site") fail("run the scope verifier from the site/ application root");
  let canonicalRoot;
  try {
    canonicalRoot = await realpath(root);
  } catch {
    fail("site application root is missing or unreadable");
  }
  if (canonicalRoot !== root) fail("site application root must not resolve through a path alias or symlink");

  await verifySource(root);
  if (args[0] === "--output") await verifyOutput(root);
  process.stdout.write(`scope verification ${args[0]}: PASS\n`);
}

main().catch((error) => {
  process.stderr.write(`scope verification: FAIL — ${error.message}\n`);
  process.exitCode = 1;
});
