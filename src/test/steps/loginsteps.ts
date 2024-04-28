import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);


Given("User navigates to the application", async function () {
  await pageFixture.page.goto(process.env.BASEURL);
  await pageFixture.logger.info("User navigates to the application - Enters the baseurl");
});

Given("User click on the login link", async function () {
  await pageFixture.page.locator("(//span[@class='mdc-button__label'])[2]").click();
  await pageFixture.logger.info("User clicks the login link");
});

Given("User enter the username as {string}", async function (username) {
  await pageFixture.page.locator("input[formcontrolname='username']").fill(username);
  await pageFixture.logger.info("User enters the username");
});

Given("User enter the password as {string}", async function (password) {
  await pageFixture.page.locator("input[formcontrolname='password']").fill(password);
  await pageFixture.logger.info("User enters the password");
});

When("User click on the login button", async function () {
  await pageFixture.page.locator("(//span[text()='Login']/following-sibling::span)[3]").click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.logger.info("User enters the username");
});

Then("Login should be success as {string}", async function (username) {
  const user = await pageFixture.page.locator("(//span[@class='mdc-button__label']//span)[1]" );
  await expect(user).toBeVisible(username);
  await expect(user).toBe(username);    // This is to force the test fails here
  const userName = await user.textContent();
  console.log("Username: " + userName);
  await pageFixture.logger.info("Login is successfull...." + "Username: " + userName);
});

When("Login should fail", async function () {
  const failureMesssage = await pageFixture.page.locator("mat-error.mat-mdc-form-field-error.mat-mdc-form-field-bottom-align");
  await expect(failureMesssage).toBeVisible();
  const message = await failureMesssage.textContent();
  console.log("Failure message " + message);
  await pageFixture.logger.info("Login Failed");
});