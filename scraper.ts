import puppeteer from "puppeteer";

const scrape = async (browser: any, url: string) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".compact-appointment");

  const lecturesTime = await page.evaluate(() => {
    const appointments: HTMLElement[] = Array.from(
      document.getElementsByClassName("compact-appointment")
    );
    const lecTime = appointments.map((app: any) => {
      const day = app
        .querySelector(".appointment-title .ng-star-inserted")
        .textContent.trim();
      const time = app.querySelector(".appointment-time").innerText.split("-");
      const period = document
        .querySelector(".strong.appointment-date.ng-star-inserted")
        .innerText.trim();
      return {
        day: day,
        start: time[0].split(",")[1].trim(),
        end: time[1].trim(),
        period: period,
      };
    });
    const polishedLecTime: {
      day: string;
      start: string;
      end: string;
      period: string;
    }[] = [];
    for (const app of lecTime) {
      let skip = false;
      for (const savedApp of polishedLecTime) {
        skip =
          app.day === savedApp.day &&
          app.start === savedApp.start &&
          app.end === savedApp.end;
      }
      if (skip) continue;
      polishedLecTime.push(app);
    }
    return polishedLecTime;
  });
  const title = await page.evaluate(() => {
    return document
      .querySelector(".ca-header-page-title.ng-star-inserted")
      .innerText.split("/")[1]
      .trim();
  });

  return { name: title, appointments: lecturesTime };
};

export interface Course {
  name: string;
  ects: number;
  url: string;
  theo: boolean;
  active: boolean;
  appointments: {
    day: string;
    start: string;
    end: string;
    period: string;
  }[];
}

export interface Area {
  name: string;
  courseList: Course[];
}

var data = require("./courses.json");
import { writeFile } from "fs/promises";

const resultData: Area[] = [];

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });

  for (const area of data.areas) {
    console.log("\x1b[0m" + "\x1b[44m" + area.name + "\x1b[0m");

    // if (!area.courses || area.courses.length <= 0) {
    //   resultData.push({ name: area.name, courseList: [] });
    // }
    const courses = [];
    for (const course of area.courses) {
      console.log("\x1b[34m    Processing " + course.url);

      const lecturesTime = await scrape(browser, course.url);
      courses.push({
        ...lecturesTime,
        ects: course.ects,
        theo: !!course.theo,
        url: course.url,
        active: false,
      });
    }
    resultData.push({ name: area.name, courseList: courses });
  }
  writeFile("./courses-info.json", JSON.stringify(resultData));

  await browser.close();
})();

/*
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"
FgGray = "\x1b[90m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
BgGray = "\x1b[100m"
*/
