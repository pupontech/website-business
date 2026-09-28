import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Home — private draft" },
  { path: "/services/", heading: "Services — private draft" },
  { path: "/contact/", heading: "Contact — coming soon" },
];
const widths = [195, 320, 390, 768, 1024, 1440];
const notice = "PRIVATE DRAFT — placeholder identity; not for publication.";

for (const route of routes) {
  for (const width of widths) {
    test(`${route.path} renders a safe draft at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const external: string[] = [];
      page.on("request", (request) => {
        if (new URL(request.url()).hostname !== "127.0.0.1") external.push(request.url());
      });
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
      await expect(page.getByText(notice, { exact: true })).toBeVisible();
      await expect(page.getByRole("navigation")).toBeVisible();
      expect(await page.locator("h1").count()).toBe(1);
      expect(await page.locator("script, form, input, button, textarea, select").count()).toBe(0);
      expect(await page.locator('meta[name="robots"]').getAttribute("content")).toBe("noindex,nofollow");
      expect(await page.locator("html").getAttribute("lang")).toBe("en");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      expect(external).toEqual([]);
      if (width !== 195) {
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"]).analyze();
        expect(axe.violations).toEqual([]);
      }
    });
  }
}

test("contact has no message channel", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.getByText("This private draft has no contact form or message channel.")).toBeVisible();
  expect(await page.locator('a[href^="mailto:"], a[href^="tel:"], a[href^="http"], form').count()).toBe(0);
});

test("services labels remain explicitly unverified", async ({ page }) => {
  await page.goto("/services/");
  await expect(page.getByText("Service areas under consideration — scope and capability not yet confirmed.")).toBeVisible();
  await expect(page.getByText("Astro static", { exact: true })).toBeVisible();
  await expect(page.getByText("Astro CMS", { exact: true })).toBeVisible();
});

test("skip link becomes visible on focus and reaches main", async ({ page }) => {
  await page.setViewportSize({ width: 195, height: 900 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  expect(await skip.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return box.top >= 0 && box.left >= 0 && box.right <= innerWidth &&
      style.visibility === "visible" && style.display !== "none";
  })).toBe(true);
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
