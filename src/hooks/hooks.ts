import {
  Before,
  BeforeAll,
  After,
  AfterAll,
  Status,
  AfterStep,
} from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import * as fs from "fs";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  const page = await context.newPage();
  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
});

AfterStep(async function ({ pickle, result }) {
  console.log(result?.status);
  const image = await pageFixture.page.screenshot({
    path: `./test-results/screenshots/${pickle.name}.png`,
    type: "png",
  });
  await this.attach(image, "image/png");
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let image: Buffer;
  console.log(result?.status);
  if (result?.status == Status.FAILED) {
    const image = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await pageFixture.page.video().path();
  }
  await pageFixture.page.close();
  await context.close();

  if (result?.status == Status.FAILED) {
    await this.attach(image, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
  }
});

AfterAll(async function () {
  await browser.close();
});
