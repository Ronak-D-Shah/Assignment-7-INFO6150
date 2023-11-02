const timeLabel = document.getElementById("time");
const datePicker = document.getElementById("date-picker");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function getCurrentTimeEST() {
  const now = new Date();
  const utcDate = new Date(now.toUTCString());
  utcDate.setMinutes(utcDate.getMinutes() - 300);
  return utcDate;
}

let timer;
let isRunning = false;
let startTime = 0;
let pausedTime = 0;

function updateTime() {
  const currentTime = getCurrentTimeEST().getTime();
  const elapsedTime = isRunning
    ? currentTime - startTime + pausedTime
    : pausedTime;

  const date = new Date(elapsedTime);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  timeLabel.textContent = `${hours}:${minutes}:${seconds}`;
}

datePicker.value = new Date().toISOString().slice(0, -8);

startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    if (pausedTime === 0) {
      startTime = getCurrentTimeEST().getTime();
    } else {
      const currentTime = getCurrentTimeEST().getTime();
      startTime = currentTime - pausedTime;
      pausedTime = 0;
    }
    timer = setInterval(updateTime, 1000);
    stopButton.disabled = false;
    startButton.disabled = true;
    datePicker.disabled = true;
  }
});

stopButton.addEventListener("click", () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    pausedTime = pausedTime + (getCurrentTimeEST().getTime() - startTime);
    stopButton.disabled = true;
    startButton.disabled = false;
    datePicker.disabled = false;
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  pausedTime = 0;
  timeLabel.textContent = "00:00:00";
  startButton.disabled = false;
  stopButton.disabled = true;
  datePicker.disabled = false;
});

updateTime();
