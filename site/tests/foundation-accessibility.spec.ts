import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const wcagTags = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22a",
  "wcag22aa",
];

const viewports = [
  { width: 195, height: 900 },
  { width: 320, height: 900 },
  { width: 390, height: 844, screenshot: "mobile-390x844.png" },
  { width: 768, height: 1024, screenshot: "tablet-768x1024.png" },
  { width: 1024, height: 900 },
  { width: 1440, height: 900, screenshot: "desktop-1440x900.png" },
];

test.describe("route-neutral foundation accessibility", () => {
  for (const viewport of viewports) {
    test(`has no axe WCAG 2.0/2.1/2.2 A/AA violations at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const response = await page.goto("/");
      expect(response, "the local static preview must respond").not.toBeNull();
      expect(response?.status()).toBe(200);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Local foundation demonstration",
        }),
      ).toBeVisible();

      const overflowingElements = await page.evaluate(() => {
        const elements = [
          document.documentElement,
          document.body,
          document.querySelector("main"),
          ...document.querySelectorAll("main h1, main p"),
        ].filter((element): element is Element => element !== null);

        return elements
          .filter((element) => element.scrollWidth > element.clientWidth)
          .map((element) => element.tagName.toLowerCase());
      });
      expect(overflowingElements, `no horizontal overflow at ${viewport.width}px`).toEqual([]);

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
      expect(results.testEngine.version, "axe-core must complete the scan").toBeTruthy();
      expect(results.passes.length, "the requested axe rules must have run").toBeGreaterThan(0);
      expect(results.violations).toEqual([]);

      if (viewport.screenshot) {
        await page.screenshot({
          path: `test-results/screenshots/${viewport.screenshot}`,
          fullPage: true,
          type: "png",
        });
      }
    });
  }
});
