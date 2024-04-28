import { Before, BeforeAll, After, AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  pageFixture.page = page;
});

Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

AfterStep(async function ({ pickle, result }) {
  console.log(result?.status);
  const image = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
  await this.attach(image, "image/png");
});

After(async function ({ pickle, result }) {
  console.log(result?.status);
  if (result?.status == Status.FAILED) {
    const image = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    await this.attach(image, "image/png");
  }
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
