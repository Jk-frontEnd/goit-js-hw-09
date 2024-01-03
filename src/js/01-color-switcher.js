
const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const page = document.querySelector("body");
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(() => {
    page.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener("click", () => {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
});
