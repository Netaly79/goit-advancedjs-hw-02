import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + i * step;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success!',
          message: `Fulfilled promise ${position} in ${delay}ms`,
          position: 'topCenter',
          timeout: 25000,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Fail!',
          message: `Rejected promise ${position} in ${delay}ms`,
          position: 'topCenter',
          timeout: 25000,
        });
      });
  }
});
