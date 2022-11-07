"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const sleepFor = async (min, max) => {
    let duration = randomIntFromInterval(min, max);
    console.log("Waiting for ", duration / 1000, "seconds");
    await new Promise((r) => setTimeout(r, duration));
};
// Complete authentication process: twitter.com/login to twitter.com/home
const authenticate = async (page) => {
    try {
        const usernameInput = await page.$x(`//input[@name="text"]`);
        if (usernameInput.length > 0) {
            await usernameInput[0].focus();
            await page.keyboard.type("amprowmusic");
        }
        const buttonsUsername = await page.$x(`//div[@role='button']//span[text()='Next']`);
        if (buttonsUsername.length > 0) {
            //@ts-ignore
            await buttonsUsername[0].click();
        }
        // Wait for password page
        await page.waitForXPath('//input[@type="password"]');
        const passwordInput = await page.$x(`//input[@type="password"]`);
        if (passwordInput.length > 0) {
            await passwordInput[0].focus();
            await page.keyboard.type("*GhLSuPnADp6");
        }
        const buttonsPassword = await page.$x(`//div[@role='button']//span[1]`);
        if (buttonsPassword.length > 0) {
            //@ts-ignore
            await buttonsPassword[3].click();
        }
    }
    catch (e) {
        console.error(e);
    }
};
const searchAccount = async (page, account) => {
    try {
        const pageInputs = await page.$x(`//input[@aria-label='Search query']`);
        if (pageInputs.length > 0) {
            await pageInputs[0].focus();
            await page.keyboard.type(account);
            await page.keyboard.press("Enter");
            //   await page.waitForXPath("//a[@href='/elonmusk']");
            //   await page.click(`//a[@href='/elonmusk']`);
        }
    }
    catch (e) {
        console.error(e);
    }
};
const main = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        const URL = "https://twitter.com/login";
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
        });
        await page.goto(URL, { waitUntil: "networkidle2" });
        // await sleepFor(1000, 2000);
        await authenticate(page);
        await page.waitForXPath(`//input`);
        await searchAccount(page, "elon musk");
    }
    catch (e) {
        console.error(e);
    }
};
const app = async () => {
    await main();
};
app();
