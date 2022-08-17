function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const head = document.querySelector('head');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

const onStartClick = (evt) => {
    timerId = setInterval(() => {
        head.insertAdjacentHTML('beforeend', `
            <style type=""text/css">
            body {
                background-color: ${getRandomHexColor()};
            }
            </style>
        `);
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

const onStopClick = (evt) => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

stopBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
