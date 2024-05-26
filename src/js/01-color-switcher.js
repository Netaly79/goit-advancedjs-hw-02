const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
stopButton.disabled = true;
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function startChangingColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopChangingColor() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);
