import * as elements from "typed-html";
import { Course, Area } from "./scraper";

const data = require("./courses-info.json") as Area[];

function genTimeTable(start: number, end: number): string[] {
  let times: string[] = [];
  for (let h = start; h <= end; h++) {
    times.push(`${h.toString()}:00`);
  }
  return times;
}

function getAreaEtcs(areaName: string): number {
  return data
    .filter((area: Area) => area.name == areaName)[0]
    .courseList.map((course: Course) => course.etcs)
    .reduce((a, b) => a + b);
}

function getTheoEtcs(): number {
  return data
    .map((area: Area) =>
      area.courseList
        .filter((course: Course) => course.theo && course.active)
        .map((course: Course) => course.etcs)
    )
    .flat()
    .reduce((a, b) => a + b);
}

function totalEtcs(): number {
  return data
    .map((area: Area) =>
      area.courseList
        .filter((course: Course) => course.active)
        .map((course: Course) => course.etcs)
    )
    .flat()
    .reduce((a, b) => a + b);
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const pageContent = (
  <div class="mt-12">
    <div class="flex flex-row">
      {weekDays.map((dayName) => (
        <div class="mx-5">
          <h2 class="bg-green-300 font-semibold text-xl">{dayName}</h2>
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
      <button
        id="save-button"
        class="h-min justify-self-center p-4 rounded-lg font-bold bg-blue-300"
      >
        SAVE JSON
      </button>
    </div>
    <div class="mt-5">
      <div class="text-xl bg-slate-200 flex flex-row">
        <h2 class="">Theo: </h2>
        <p class="ml-4 " id="theo">
          {getTheoEtcs()}
        </p>
      </div>
      <div class="text-xl bg-green-200 flex flex-row">
        <h2 class="">Total: </h2>
        <p class="ml-4 " id="total">
          {totalEtcs()}
        </p>
      </div>
      {data.map((area: Area) => {
        if (area.courseList.length <= 0) return;
        return (
          <div class="mb-5">
            <div class="text-xl flex flex-row">
              <h2 class="">{area.name}: </h2>
              <p class="ml-4" id={area.name}>
                {getAreaEtcs(area.name)}
              </p>
            </div>
            {area.courseList.map((course: Course) => {
              return (
                <div class="flex flex-row">
                  <input
                    type="checkbox"
                    id={course.name + "-checkbox"}
                    checked={course.active}
                  ></input>
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

export const modal = (
  <div class="flex justify-center">
    <div
      class="fixed  mt-24 p-5 hidden z-40 bg-white border-slate-700 border-2 rounded-lg"
      id="modal"
    ></div>
  </div>
);

export const pageBody = <div class="flex justify-center">{pageContent}</div>;
