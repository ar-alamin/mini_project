const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");

const randomColor = function () {
  let hexColor = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += hexColor[Math.floor(Math.random() * 16)];
  }
  return color;
};

let interverId;

startBtn.addEventListener("click", function () {
  if (!interverId) {
    interverId = setInterval(changeBgColor, 1000);
  }

  function changeBgColor() {
    document.body.style.backgroundColor = randomColor();
  }
});

stopBtn.addEventListener("click", function () {
  clearInterval(interverId);
  interverId = null;
});
