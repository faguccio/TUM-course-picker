import * as elements from "typed-html";
import { Course, Area } from "./scraper";

const data = require("./courses-info.json");

function genTimeTable(start: number, end: number): string[] {
  let times: string[] = [];
  for (let h = start; h <= end; h++) {
    times.push(`${h.toString()}:00`);
  }
  return times;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const pageContent = (
  <div>
    <div class="flex m-5 flex-row">
      {weekDays.map((dayName) => (
        <div class="bg-green-300 mx-5">
          {dayName}
          {genTimeTable(8, 18).map((time) => {
            return (
              <div
                class="flex flex-row bg-orange-100"
                id={`${dayName}-${time}`}
              >
                <p class="pr-4">{time}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
    <div class="m-5">
      <div class="text-xl bg-slate-200 flex flex-row">
        <h2 class="">Theo: </h2>
        <p class="ml-4 " id="theo">
          0
        </p>
      </div>
      <div class="text-xl bg-green-200 flex flex-row">
        <h2 class="">Total: </h2>
        <p class="ml-4 " id="total">
          0
        </p>
      </div>
      {data.map((area: Area) => {
        if (area.courseList.length <= 0) return;
        return (
          <div class="mb-5">
            <div class="text-xl flex flex-row">
              <h2 class="">{area.name}: </h2>
              <p class="ml-4" id={area.name}>
                0
              </p>
            </div>
            {area.courseList.map((course: Course) => {
              return (
                <div class="flex flex-row">
                  <input type="checkbox" id={course.name + "-checkbox"}></input>
                  <p class="ml-5 ">{course.name}</p>
                  {course.theo ? <p class="ml-8 font-bold">THEO</p> : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
);

export function renderCalendar(/*pageContent: string*/) {
  const pageBody = <div class="flex justify-center">{pageContent}</div>;
  const modal = (
    <div class="flex justify-center">
      <div
        class="fixed  mt-24 p-5 hidden z-40 bg-white border-slate-700 border-2 rounded-lg"
        id="modal"
      ></div>
    </div>
  );
  const page = `
        <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                ${modal}
                ${pageBody}
            </body>
          <script type="module" src="./interactivity.js"></script>
        </html>`;

  return page;
}
