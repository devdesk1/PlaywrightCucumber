import { Before, BeforeAll, After, AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({pickle}) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
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
  pageFixture.logger.close();
});
