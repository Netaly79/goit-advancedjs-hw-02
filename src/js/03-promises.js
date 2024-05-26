import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputs = form.querySelectorAll('input');
const submitButton = document.getElementById('submit');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  submitButton.disabled = true;

  const form = event.target;
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  let counter = 0;
  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + i * step;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success!',
          message: `Fulfilled promise ${position} in ${delay}ms`,
          position: 'topCenter',
          timeout: 15000,
        });
        counter++;
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Fail!',
          message: `Rejected promise ${position} in ${delay}ms`,
          position: 'topCenter',
          timeout: 15000,
        });
        counter++;
      })
      .finally(() => {
        if (counter == amount) submitButton.disabled = false;
      });
  }
});

function checkFormValidity() {
  let allFieldsFilled = true;
  inputs.forEach(input => {
    if (!input.value) {
      allFieldsFilled = false;
    }
  });
  submitButton.disabled = !allFieldsFilled;
}

inputs.forEach(input => {
  input.addEventListener('input', checkFormValidity);
});
