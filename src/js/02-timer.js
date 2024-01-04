import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.querySelector("input");
const btnStart = document.querySelector("button");

const daysOutput = document.querySelector(".value[data-days]");
const hoursOutput = document.querySelector(".value[data-hours]");
const minsOutput = document.querySelector(".value[data-minutes]");
const secsOutput = document.querySelector(".value[data-seconds]");

let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (!selectedDates[0] || selectedDates[0] < new Date()) {
      btnStart.disabled = true;
      alert("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

const onClick = () => {  
  const targetDate = new Date(dateInput.value);
  const currentDate = new Date();

  let timeRemaining = targetDate.getTime() - currentDate.getTime();

  if (timeRemaining <= 0) {
    alert("Selected date has already passed.");
    return;
  } else {
    btnStart.disabled = true;
  }

  updateTimerDisplay(timeRemaining);

  timerId = setInterval(() => {
    timeRemaining -= 1000;
    updateTimerDisplay(timeRemaining);
  }, 1000);
};

const updateTimerDisplay = (timeRemaining) => {
  if (timeRemaining < 0) {
    clearInterval(timerId);
    alert("Countdown completed!");

    daysOutput.textContent = 0;
    hoursOutput.textContent = 0;
    minsOutput.textContent = 0;
    secsOutput.textContent = 0;

    btnStart.disabled = false;
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  daysOutput.textContent = days;
  hoursOutput.textContent = hours;
  minsOutput.textContent = minutes;
  secsOutput.textContent = seconds;
};

btnStart.addEventListener('click', onClick);
