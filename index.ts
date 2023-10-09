const fs = require("fs");

import { renderCalendar } from "./example";

/*
fs.writeFile("/tmp/test", "Hey there!", function (err: any) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});*/

// Or
fs.writeFileSync("./index.html", renderCalendar());
