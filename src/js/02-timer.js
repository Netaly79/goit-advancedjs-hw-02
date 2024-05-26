import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.querySelector('#datetime-picker');
const start_button = document.querySelector('[data-start]');
const days_counter = document.querySelector('[data-days]');
const hours_counter = document.querySelector('[data-hours]');
const minutes_counter = document.querySelector('[data-minutes]');
const seconds_counter = document.querySelector('[data-seconds]');
let countdownInterval = 0;

start_button.disabled = true;
let targetDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate < new Date()) {
      start_button.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topLeft',
      });
    } else {
      start_button.disabled = false;
    }
  },
};

const fp = flatpickr(myInput, options); // flatpickr

start_button.addEventListener('click', () => {
  start_button.disabled = true;
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'BINGO',
        message: 'Time is up!',
        position: 'topLeft',
      });
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    days_counter.textContent = `${addLeadingZero(days)}`;
    hours_counter.textContent = `${addLeadingZero(hours)}`;
    minutes_counter.textContent = `${addLeadingZero(minutes)}`;
    seconds_counter.textContent = `${addLeadingZero(seconds)}`;
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
