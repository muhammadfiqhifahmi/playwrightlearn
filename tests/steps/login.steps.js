const { chromium } = require('playwright');
const { Before, After, Given, When, Then, Status, setDefaultTimeout } = require('@cucumber/cucumber');

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

When('I input username and password', async function () {
  // Replace with actual code to input username and password
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
});

Then('I should be logged in successfully', async function () {
  // Replace with actual code to verify successful login
  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]');
});

After(async function () {
  await browser.close();
})