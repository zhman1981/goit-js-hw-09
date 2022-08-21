import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

const submitForm = document.querySelector('form');

const onSubmitForm = (evt) => {
  evt.preventDefault(); 
  const promises = [];
  let delayi = Number(submitForm.delay.value);
  for (let i = 0; i < submitForm.amount.value; i++) {
    createPromise(i, delayi)
    .then(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position+1} in ${delay}ms`);
      }, delay);
    })
    .catch(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position+1} in ${delay}ms`);
      }, delay);
    });
    delayi += Number(submitForm.step.value);
  }
}

submitForm.addEventListener('submit', onSubmitForm);
