import puppeteer from "puppeteer";
import { TwitterApi } from "twitter-api-v2";
import {} from "dotenv/config";

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const sleepFor = async (min: number, max: number) => {
  let duration = randomIntFromInterval(min, max);
  console.log("Waiting for ", duration / 1000, "seconds");
  await new Promise((r) => setTimeout(r, duration));
};

// Complete authentication process: twitter.com/login to twitter.com/home
const authenticate = async (page: puppeteer.Page) => {
  try {
    const usernameInput = await page.$x(`//input[@name="text"]`);
    if (usernameInput.length > 0) {
      await usernameInput[0].focus();
      await page.keyboard.type("amprowmusic");
    }
    const buttonsUsername = await page.$x(
      `//div[@role='button']//span[text()='Next']`
    );
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
  } catch (e) {
    console.error(e);
  }
};

const searchAccount = async (page: puppeteer.Page, account: string) => {
  try {
    const pageInputs = await page.$x(`//input[@aria-label='Search query']`);
    if (pageInputs.length > 0) {
      await pageInputs[0].focus();
      await page.keyboard.type(account);
      await page.keyboard.press("Enter");
      //   await page.waitForXPath("//a[@href='/elonmusk']");
      //   await page.click(`//a[@href='/elonmusk']`);
    }
  } catch (e) {
    console.error(e);
  }
};

// const main = async () => {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const URL = "https://twitter.com/login";

//     await page.setViewport({
//       width: 1280,
//       height: 800,
//       deviceScaleFactor: 1,
//     });

//     await page.goto(URL, { waitUntil: "networkidle2" });

//     await authenticate(page);
//     await page.waitForXPath(`//input`);
//     await searchAccount(page, "elon musk");
//   } catch (e) {
//     console.error(e);
//   }
// };

const main = async () => {
  try {
    const client = new TwitterApi(
      "AAAAAAAAAAAAAAAAAAAAAJMAjQEAAAAAubAnqUuH7zDb0szMmri3RC766iw%3DPpbW0Ato7p5w3l3Q8NZHdOgAjcln0lH8SkG8aLNSzvDq7yrMvF"
    );
    const result = await client.v2.userByUsername("elonmusk", {
      "user.fields": [
        "id",
        "description",
        "created_at",
        "profile_image_url",
        "location",
        "verified",
      ],
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

const app = async () => {
  await main();
};
app();
