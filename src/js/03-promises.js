import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();

  let { delay, step, amount } = ev.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay).then(onMakeOrderSuccess).catch(onMakeOrderError);
    delay += step;
  }
}

const onMakeOrderSuccess = ({ position, delay }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const onMakeOrderError = ({ position, delay }) => {
  Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
