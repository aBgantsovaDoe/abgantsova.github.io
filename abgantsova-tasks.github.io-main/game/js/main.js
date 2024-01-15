//import './data.js';
import { setTimer } from './timer.js'
import { setBeginFirstLevel, setEndFirstLevel } from './first-level.js';
import { setBeginSecondLevel, setEndSecondLevel } from './second-level.js';
import { putCurrentInStorage, getCurrentFromStorage, getRandom } from './util.js';

//check authorization

//display info about current user
const current_user = getCurrentFromStorage();
if (!current_user) window.location.href = '../pages/authorization.html';
document.querySelector('.name').textContent = current_user['name'];
document.querySelector('.score-num').textContent = current_user['score'];
const difficulty = current_user['difficulty'];
document.querySelector('.difficulty-lvl').textContent = difficulty === 'easy' ? 'легко' : 'сложно';
if (current_user['level'] >= 2) document.querySelector('#second').checked = true;

let additional = false;

const displayTask = function (difficulty, level) {
  const firstTasks = ['Первая и последняя буква обе гласные или согласные', 'В слове больше 4-х букв'];
  if (level === 1) {
    if (difficulty === 'easy') { 
      const num = getRandom(0, firstTasks.length - 1);
      console.log(num);
      if (num >= 1) additional = true;
      document.querySelector('.task-text').textContent = firstTasks[num];
    }
    else document.querySelector('.task-text').textContent = 'В слове не больше 2-х слогов';
  } 
  else {
    if (difficulty === 'easy') document.querySelector('.task-text').textContent = 'Слова с 3-мя слогами должны быть справа, остальные - слева';
    else document.querySelector('.task-text').textContent = 'Слова мужского рода должны быть слева, остальные - справа';
  }
};
displayTask(difficulty, current_user['level']);

//game
const onOffButton = document.querySelector('.onOffButton');

const offButton = function () {
  if (current_user['level'] === 1) setEndFirstLevel();
  else {
    if (setEndSecondLevel()) current_user['level']++;
  }
  onOffButton.removeEventListener('click', offButton);
  onOffButton.addEventListener('click', onButton);
};

const onButton = function () {
  onOffButton.removeEventListener('click', onButton);
  onOffButton.addEventListener('click', offButton);
  if (current_user['level'] === 1) setBeginFirstLevel(difficulty, additional);
  else setBeginSecondLevel(difficulty, current_user['score']);
  setTimer();
}

onOffButton.addEventListener('click', onButton);

const toNextLvl = document.querySelector('.to-next-lvl');

const setToNextLvl = function () {
  current_user['score'] = Number(document.querySelector('.score-num').textContent);
  current_user['level'] = current_user['level'] + 1;
  putCurrentInStorage(current_user);
  document.querySelector('#second').checked = true;
  toNextLvl.classList.add('hidden');
  displayTask(difficulty, current_user['level']);
  while (document.querySelector('.field').firstChild) {
    document.querySelector('.field').firstChild.remove();
  }
  onOffButton.removeEventListener('click', offButton);
  onOffButton.addEventListener('click', onButton);
  onOffButton.textContent = 'Начать';
};

toNextLvl.addEventListener('click', setToNextLvl);

const toRating = function (evt) {
  evt.preventDefault();
  if(current_user['level'] >= 2) {
    current_user['score'] = Number(document.querySelector('.score-num').textContent);
    putCurrentInStorage(current_user);
  }
  window.location.href = '../pages/rating.html';
}
document.querySelector('.rating').addEventListener('click', toRating);
