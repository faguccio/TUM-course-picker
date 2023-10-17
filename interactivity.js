async function fetchData() {
  const res = await fetch("./courses-info.json");
  const data = await res.json();
  return data;
}

fetchData().then((data) => {
  data.map((area) => {
    area.courseList.map((course) => {
      document
        .getElementById(course.name + "-checkbox")
        .addEventListener("click", (e) => {
          //console.log(course.name);
          const color =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          drawCalendar(course, color);
          modifyETCS(area.name, course.etcs, course.theo, course.active);
        });
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
  if (course.active) {
    course.active = false;
    const allNodes = document.getElementsByClassName(course.name);
    Array.from(allNodes).map((node) => {
      node.innerHTML = "";
    });
    return;
  }
  course.active = true;
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
