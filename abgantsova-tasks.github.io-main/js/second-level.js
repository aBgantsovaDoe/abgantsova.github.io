import { displayCards, displayZone, inGame, outGame } from "./display-level.js";
import { deleteTimer } from "./timer.js";

const ACCRUAL = 3;
const EASY_FORFAIT = 1.5;
const HARD_FORFAIT = 2;

const field = document.querySelector('.field');
const score = document.querySelector('.score-num');
let difficultyLvl = 'easy';

const allowDrop = function (evt) {
  evt.preventDefault();
};
const drag = function (evt) {
  evt.dataTransfer.setData('id', evt.target.id);
};
const drop = function (evt) {
  const element = document.getElementById(evt.dataTransfer.getData('id'));
  evt.target.append(element);
  const parent = element.parentNode;
  if (parent.id !== '') {
    element.draggable = false;
    element.removeEventListener('dragstart', drag);
  }
  const answer = element.querySelector('.ans').textContent;
  if(parent.id === 'l-zone' && answer === '1' || parent.id === 'r-zone' && answer === '2') {
    score.textContent = `${Number(score.textContent) + ACCRUAL}`;
  } else if (parent.id !== '')
  {
    const subtraction = difficultyLvl === 'easy' ? EASY_FORFAIT : HARD_FORFAIT;
    score.textContent = `${Number(score.textContent) - subtraction}`;
  }
  const pool = document.querySelector('.pool');
  if (!pool.firstElementChild) {
    setEndSecondLevel(true);
  };
};

const setBeginSecondLevel = function (difficulty, prevScore) {
  difficultyLvl = difficulty;
  score.textContent = prevScore;
  document.querySelector('.to-next-lvl').classList.add('hidden');
  inGame();
  displayCards(difficulty, 2);

  const cards = document.querySelector('.pool').querySelectorAll('.card');
  cards.forEach(element => {
    element.addEventListener('dragstart', drag);
  });

  const zones = document.querySelectorAll('.zone');
  zones.forEach(element => {
    element.addEventListener('drop', drop);
    element.addEventListener('dragover', allowDrop);
  });
};

const setEndSecondLevel = function (isEmpty = false) {
  deleteTimer();
  while (field.firstChild) {
    field.firstChild.remove();
  }
  outGame();
  if (isEmpty) {
    field.textContent = 'Поздравляю! Игра окончена. Чтобы пройти уровень ещё раз, нажмите кнопку "Начать заново" дважды';
  }
  return isEmpty;
};

export { setBeginSecondLevel, setEndSecondLevel };