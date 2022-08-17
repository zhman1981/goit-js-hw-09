import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
let lastDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        startBtn.disabled = true;
        return;
    }
    startBtn.disabled = false;
    lastDate = selectedDates[0].getTime();
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const addLeadingZero = (value) => {
    return String(value).padStart(2, '0');
}

const onStartClick = (evt) => {
    startBtn.disabled = true;
    const timeID = setInterval(() => {
        let difTime = lastDate - Date.now();
        if (lastDate<Date.now()) {
            clearInterval(timeID);
            return;
        }
        document.querySelector('span[data-days]').textContent = addLeadingZero(convertMs(difTime).days);
        document.querySelector('span[data-hours]').textContent = addLeadingZero(convertMs(difTime).hours);
        document.querySelector('span[data-minutes]').textContent = addLeadingZero(convertMs(difTime).minutes);
        document.querySelector('span[data-seconds]').textContent = addLeadingZero(convertMs(difTime).seconds);
    }, 1000);
}

startBtn.addEventListener('click', onStartClick);