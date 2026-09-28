#!/usr/bin/env node
// Exact fail-closed source/output inventory for the local-only agency draft.
import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
const SOURCE = {
  '.gitignore': '080cca9e4180b0ea4c36ec5938ed816123a6dc7162d2c7bcee5a114fd1a478e5',
  '.nvmrc': '73fb1b615e2043a933be1c0895cde4358036acc28d785692509b822aa53c761f',
  'astro.config.mjs': '2bd7627b76e73de685a7e177441ae920bbbd5113163f3bafe5d2d197d700ade4',
  'package.json': 'b1648c36e43634db20778c393e59a23ec37fbbc2c6f1b7854b4bde5090f1c5f9',
  'package-lock.json': 'e261734f7e7e5293e4311358f8555a9f35e5703a9317821f8ab90440685f539b',
  'playwright.config.ts': '309181bfd9e122ee52a169372c6ec32dd3c900f5a017fbe6202264c3c5f5976a',
  'tsconfig.json': 'b5b0a5b04a14cddd7713c5e1c82e86c79c17c2f86b170e26e9b170b3d5e01cd9',
  'src/components/DraftBanner.astro': 'fe7246dca2c69a7689b4972b73a291e75e8623a4857b9723a37df202bab280a3',
  'src/components/PrimaryNav.astro': 'c53b411acb405a0763f4c4ae1e947143e21f668381d94746739a4e58355f6e72',
  'src/components/SiteFooter.astro': '71ceb8a684005780876364f550b7ef8428787dad0c910fb49e7abd839aa4f108',
  'src/layouts/AgencyDraftLayout.astro': '5ac8a0bf9c3e7e8fc20d384047e8ac0fa2fdee660682e21138cf6ebc19e78521',
  'src/pages/contact.astro': '96369a46c5823414beca03097ddb2e9a9fc4ec4d63898cf376e5bab75d12774a',
  'src/pages/index.astro': 'e8179fdb220a61d54780180f4eccdd5a1990c9afa28575749a3f31d43c07b846',
  'src/pages/services.astro': 'a4ce62cb73e598f9cb827a653f30ed4a1caf5d03833754abd6d268a6c33a9bb0',
  'src/styles/global.css': '0b87cf86f9aeefa6453afbbe39c1dc00b3bae1a7ddac3ae81a5393ac96b59286',
  'tests/agency-draft.spec.ts': '0ddc6491b5d3aeaa614f1a4d84ac375ad9f7c768fd2bc3a1ddfb0e5638575c62',
  'tests/foundation-accessibility.spec.ts': 'cac67e9059175a33b99dce7e647f549a005e226a5cb07a37422164072ba54167',
  "scripts/verify-scope.mjs": null,
};
const OUTPUT = {
  'index.html': 'c89c4f9f510148786e6c99db301501ec50cebf7ca4585d250be12d3852d951d7',
  'services/index.html': 'fb3f4fa0ca4187741268e33ca4b82ffb9e1301bf38893b6c1d6853c58526309b',
  'contact/index.html': '8db14bb63e7d8d853fe5244709c570f4291a838f25c09aa782c3a2291055a7bb',
  '_astro/AgencyDraftLayout.DOLMFER0.css': '9be4d2e80c933ac9da2f170bcb9aa2f6c4eb10f6f03443666717104eeb97c550'
};
const DIRS = new Set(["scripts", "src", "src/pages", "src/components", "src/layouts", "src/styles", "tests"]);
const GENERATED = new Set(["node_modules", ".astro", "dist", "test-results", "playwright-report"]);
const FORBIDDEN = /<\s*(?:form|input|button|textarea|select|script|iframe)\b|\b(?:mailto|tel):|(?:https?:)?\/\/[^\s"'<>]+|\bclient:(?:load|idle|visible|media|only)\b|\son[a-z]+\s*=/i;
function fail(message) { throw new Error(message); }
async function checked(root, rel, expected) {
  const file = path.join(root, rel);
  const stat = await lstat(file).catch(() => fail(`missing input: ${rel}`));
  if (!stat.isFile() || stat.isSymbolicLink()) fail(`not regular file: ${rel}`);
  const bytes = await readFile(file).catch(() => fail(`unreadable input: ${rel}`));
  if (expected !== null && createHash("sha256").update(bytes).digest("hex") !== expected) fail(`unapproved bytes: ${rel}`);
  return bytes.toString("utf8");
}
async function inventory(root, expected, allowedDirs, ignoreGenerated) {
  const found = new Set();
  async function walk(folder, relative = "") {
    const items = await readdir(folder).catch(() => fail(`unreadable directory: ${relative}`));
    for (const item of items) {
      const rel = relative ? `${relative}/${item}` : item;
      const stat = await lstat(path.join(folder, item)).catch(() => fail(`unreadable entry: ${rel}`));
      if (stat.isSymbolicLink()) fail(`symlink prohibited: ${rel}`);
      if (ignoreGenerated && !relative && GENERATED.has(rel)) {
        if (!stat.isDirectory()) fail(`generated path not a directory: ${rel}`);
        continue;
      }
      if (stat.isDirectory()) {
        if (!allowedDirs.has(rel)) fail(`unexpected directory: ${rel}`);
        await walk(path.join(folder, item), rel);
      } else if (stat.isFile()) {
        if (!Object.hasOwn(expected, rel)) fail(`unexpected file: ${rel}`);
        found.add(rel);
      } else fail(`unsupported entry: ${rel}`);
    }
  }
  await walk(root);
  if (found.size !== Object.keys(expected).length) fail("missing required files");
  for (const [rel, hash] of Object.entries(expected)) await checked(root, rel, hash);
}
async function main() {
  const mode = process.argv[2];
  if (process.argv.length !== 3 || !["--source", "--output"].includes(mode)) fail("use --source or --output");
  const root = path.resolve(process.cwd());
  if (path.basename(root) !== "site" || await realpath(root) !== root) fail("run from physical site/ root");
  await inventory(root, SOURCE, DIRS, true);
  const manifest = JSON.parse(await checked(root, "package.json", SOURCE["package.json"]));
  const lock = JSON.parse(await checked(root, "package-lock.json", SOURCE["package-lock.json"]));
  if (manifest.dependencies || Object.keys(manifest.devDependencies ?? {}).length !== 5 || lock.packages?.[""]?.dependencies) fail("runtime dependencies prohibited");
  for (const rel of ["src/pages/index.astro", "src/pages/services.astro", "src/pages/contact.astro"]) {
    if (FORBIDDEN.test(await checked(root, rel, SOURCE[rel]))) fail(`forbidden markup: ${rel}`);
  }
  if (mode === "--output") {
    const dist = path.join(root, "dist");
    const stat = await lstat(dist).catch(() => fail("built output missing"));
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail("built output not directory");
    await inventory(dist, OUTPUT, new Set(["services", "contact", "_astro"]), false);
    for (const rel of ["index.html", "services/index.html", "contact/index.html"]) {
      const html = await checked(dist, rel, OUTPUT[rel]);
      if (FORBIDDEN.test(html) || !html.includes('name="robots" content="noindex,nofollow"') || !html.includes('lang="en"') || !html.includes("PRIVATE DRAFT — placeholder identity; not for publication.")) fail(`unsafe output: ${rel}`);
      if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) fail(`expected one h1: ${rel}`);
    }
  }
  process.stdout.write(`scope verification ${mode}: PASS\n`);
}
main().catch(error => { process.stderr.write(`scope verification: FAIL — ${error.message}\n`); process.exitCode = 1; });
