import { setEndFirstLevel } from "./first-level.js";
let timer;

const timerShow = document.querySelector('.timer');
const deleteTimer = function () {
  clearInterval(timer);
  timerShow.textContent = '0:00';
};
const setTimer = function () {
  let timeMinut = 1 * 60;
  timer = setInterval(function () {
    const seconds = timeMinut % 60;
    const minutes = timeMinut / 60 % 60;
    // Условие если время закончилось то...
    if (timeMinut <= 0 || document.querySelector('.onOffButton').classList.contains('off')) {
      deleteTimer();
      setEndFirstLevel();
      if (timeMinut <= 0) { 
        document.querySelector('.field').textContent = 'Время вышло';
      }      
    } else {
        let strTimer = `${Math.trunc(minutes)}:${seconds}`;
        timerShow.textContent = strTimer;
    }
    --timeMinut; // Уменьшаем таймер
  }, 1000)
};

export { setTimer, deleteTimer };