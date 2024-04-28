import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);


Given("User navigates to the application", async function () {
  await pageFixture.page.goto("https://bookcart.azurewebsites.net/");
});

Given("User click on the login link", async function () {
  await pageFixture.page.locator("(//span[@class='mdc-button__label'])[2]").click();
});

Given("User enter the username as {string}", async function (username) {
  await pageFixture.page.locator("input[formcontrolname='username']").fill(username);
});

Given("User enter the password as {string}", async function (password) {
  await pageFixture.page.locator("input[formcontrolname='password']").fill(password);
});

When("User click on the login button", async function () {
  await pageFixture.page.locator("(//span[text()='Login']/following-sibling::span)[3]").click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(3000);
});

Then("Login should be success", async function () {
  const user = await pageFixture.page.locator("(//span[@class='mdc-button__label']//span)[1]" );
  await expect(user).toBeVisible();
  const userName = await user.textContent();
  console.log("Username: " + userName);
});

When("Login should fail", async function () {
  const failureMesssage = await pageFixture.page.locator("mat-error.mat-mdc-form-field-error.mat-mdc-form-field-bottom-align");
  await expect(failureMesssage).toBeVisible();
  const message = await failureMesssage.textContent();
  console.log("Failure message " + message);
});