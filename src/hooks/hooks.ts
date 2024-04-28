import { Before, BeforeAll, After, AfterAll } from "@cucumber/cucumber";
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

After(async function () {
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
