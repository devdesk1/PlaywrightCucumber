import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given("user search for a {string}", async function (book) {
  console.log("Searching for a book: " + book);
  await pageFixture.page.locator("input[type='search']").fill(book);
  await pageFixture.logger.info("User enters the book name and book search is on for...." + book );
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.page.locator("mat-option[role='option'] span").click();
  await pageFixture.page.waitForTimeout(1000);
  await pageFixture.logger.info("User waits for the search to complete");
});
When("user add the book to the cart", async function () {
  await pageFixture.page.locator("//span[text()[normalize-space()='Add to Cart']]").click();
  await pageFixture.logger.info("User added the book to cart");
  const toast = pageFixture.page.locator("simple-snack-bar");
  await expect(toast).toBeVisible();
  await toast.waitFor({ state: "hidden" });
});
Then("the cart badge should get updated", async function () {
  const badgeCount = await pageFixture.page
    .locator("#mat-badge-content-0")
    .textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
