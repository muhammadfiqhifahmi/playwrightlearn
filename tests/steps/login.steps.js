const { test, chromium, expect } = require('@playwright/test');
const { Before, After, Given, When, Then, Status, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');


let browser;
let context;
let page;
setDefaultTimeout(60 * 1000);

Before(async () => {
  browser = await chromium.launch({ headless: false }); // Or true for headless mode
  context = await browser.newContext();
  page = await context.newPage();
});

Given('I access the login page', async function () {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');
});

When('I input username {string} and password {string}', async function (username, password) {
  // Replace with actual code to input username and password
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
});

Then('I should be logged in successfully', async function () {
  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]');
});


Then('I should see an error message', async function () {
  // const errorMessageLocator = page.locator('[data-test="error"]');
  // await expect(errorMessageLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');
  // await page.locator('[data-test="login-button"]').toBeVisible();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

After(async function () {
  await browser.close();
})

AfterStep(async function ({ pickle, result }) {
  if (result.status === Status.PASSED || result.status === Status.FAILED) { // Capture for both passed and failed steps
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
});