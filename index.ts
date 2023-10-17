const fs = require("fs");

import { pageBody, modal } from "./calendarRenderer";

function returnFullPage() {
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

fs.writeFileSync("./index.html", returnFullPage());
