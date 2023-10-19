async function fetchData() {
  const res = await fetch("./courses-info.json");
  const data = await res.json();
  return data;
}

function getRandomColor() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

fetchData().then((data) => {
  data.map((area) => {
    area.courseList.map((course) => {
      document
        .getElementById(course.name + "-checkbox")
        .addEventListener("click", (e) => {
          //console.log(course.name);
          const color = getRandomColor();
          course.active = !course.active;
          drawCalendar(course, color);
          modifyETCS(area.name, course.etcs, course.theo, course.active);
        });
    });
  });

  document.getElementById("save-button").addEventListener("click", () => {
    console.log("SAVE");
    saveText(JSON.stringify(data), "courses-info.json");
  });

  data.map((area) => {
    area.courseList.map((course) => {
      drawCalendar(course, getRandomColor());
    });
  });
});

function genTimeTable(start, end) {
  const startingHour = start.split(":")[0];

  const endingMinute = end.split(":")[1];
  const endingHour =
    endingMinute === "00"
      ? Number(end.split(":")[0])
      : Number(end.split(":")[0]) + 1;

  let times = [];
  for (let h = startingHour; h < endingHour; h++) {
    times.push(`${h.toString()}:00`);
  }
  return times;
}

function drawCalendar(course, color) {
  if (!course.active) {
    const allNodes = document.getElementsByClassName(course.name);
    Array.from(allNodes).map((node) => {
      node.innerHTML = "";
    });
    return;
  }
  course.appointments.map((app) => {
    const times = genTimeTable(app.start, app.end);
    // console.log(times);
    times.map((time) => {
      const div = document.getElementById(`${app.day}-${time}`);
      if (div == null) return;
      const card = document.createElement("div");
      card.className = course.name;
      card.style = `background-color: ${color};`;
      const regex = /\(([^)]+)\)/g;
      const matches = course.name.match(regex);

      card.textContent = matches;
      div.appendChild(card);

      card.addEventListener("click", () => {
        const node = document.getElementById("modal");
        node.innerHTML = course.name;
        node.classList.remove("hidden");
      });
    });
  });
}

document.getElementById("modal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

function modifyETCS(area, etcs, theo, active) {
  console.log(area, etcs, theo, active);

  const sign = active ? 1 : -1;
  const areaETCS = document.getElementById(area);
  areaETCS.textContent = Number(areaETCS.textContent) + etcs * sign;

  const total = document.getElementById("total");
  total.textContent = Number(total.textContent) + etcs * sign;

  if (theo) {
    const theoETCS = document.getElementById("theo");
    theoETCS.textContent = Number(theoETCS.textContent) + etcs * sign;
  }
}

function saveText(text, filename) {
  var a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  a.setAttribute("download", filename);
  a.click();
}
