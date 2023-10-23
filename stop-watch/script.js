const timer = document.querySelector(".time");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
let [milsec, sec, min, hour] = [0, 0, 0, 0];
let t = null;

// click start button
start.addEventListener("click", function () {
  if (t !== null) {
    clearInterval(t);
  }
  t = setInterval(displayTimer, 10);
});

// click pause button
pause.addEventListener("click", function () {
  clearInterval(t);
});

// click reset button
reset.addEventListener("click", function () {
  clearInterval(t);
  [milsec, sec, min, hour] = [0, 0, 0, 0];
  timer.innerHTML = "00 : 00 : 00 : 00";
});

// display function
function displayTimer() {
  milsec += 10;
  if (milsec == 1000) {
    milsec = 0;
    sec++;

    if (sec == 60) {
      sec = 0;
      min++;

      if (min == 60) {
        min = 0;
        hour++;
      }
    }
  }

  let h = hour < 10 ? "0" + hour : hour;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let mils = milsec < 10 ? "00" + milsec : milsec < 100 ? "0" + milsec : milsec;

  timer.innerHTML = `${h} : ${m} : ${s} : ${mils}`;
}
