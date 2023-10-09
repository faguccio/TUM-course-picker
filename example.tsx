import * as elements from "typed-html";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const pageContent = (
  <div class="flex m-5 flex-row">
    {weekDays.map((name) => (
      <div class="bg-green-300 mx-5">
        {name}
        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((n) => (
          <div class="bg-orange-100 px-24 mx-4 py-4 my-1">{n}</div>
        ))}
      </div>
    ))}
  </div>
);

export function renderCalendar(/*pageContent: string*/) {
  const pageBody = <div class="flex justify-center">{pageContent}</div>;
  const page = `
        <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                ${pageBody}
            </body>
        </html>`;

  return page;
}
