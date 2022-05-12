import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const clockface = document.querySelector('.timer');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');
const currentDate = Date.now();
let dateElClock = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateElClock = selectedDates[0];
    if (dateElClock > currentDate) {
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
const flatpickrEl = new flatpickr(startInput, options);

startBtn.addEventListener('click', updateClockRun);

function updateClockRun() {
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = dateElClock - currentDate;
    days.textContent = convertMs(deltaTime).days;
    hours.textContent = convertMs(deltaTime).hours;
    minutes.textContent = convertMs(deltaTime).minutes;
    seconds.textContent = convertMs(deltaTime).seconds;
    startBtn.disabled = true;
    flatpickrEl.input.setAttribute('disabled', 'disabled');
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      startBtn.disabled = false;
    }
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}

clockface.style.backgroundColor = 'teal';
clockface.style.display = 'flex';
clockface.style.maxWidth = '500px';
clockface.style.margin = '20px';
clockface.style.padding = '10px 20px';
clockface.style.fontSize = '35px';
clockface.style.borderRadius = '20px';
clockface.style.color = '#f1f1f1';
clockface.style.justifyContent = 'center';
