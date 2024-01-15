import { displayCards, inGame, outGame } from "./display-level.js";
import { deleteTimer } from "./timer.js";

const ACCRUAL = 3;
const EASY_FORFAIT = 1;
const HARD_FORFAIT = 1.5;

const field = document.querySelector('.field');
const progress = document.querySelector('.have-progress');
const score = document.querySelector('.score-num');
let difficultyLvl = 'easy';

const setOnCard = function (evt) {
  const currentCard = evt.target.parentNode;
  if (currentCard.classList.contains('card')) {
    const answer = currentCard.querySelector('.ans').textContent;
    if (answer === '1') {
      currentCard.classList.add('right');
      progress.textContent = `${Number(progress.textContent) + 1}`;
      score.textContent = `${Number(score.textContent) + ACCRUAL}`;
    } else {
      currentCard.classList.add('wrong');
      const subtraction = difficultyLvl === 'easy' ? EASY_FORFAIT : HARD_FORFAIT;
      score.textContent = `${Number(score.textContent) - subtraction}`;
    }
  }
  if (progress.textContent === document.querySelector('.need-progress').textContent.substring(1)) {
    setEndFirstLevel(true);
  }
};

const setBeginFirstLevel = function (difficulty) {
  difficultyLvl = difficulty;
  score.textContent = 0;
  document.querySelector('.to-next-lvl').classList.add('hidden');
  inGame();
  const numRight = displayCards(difficulty);
  progress.textContent = '0';
  document.querySelector('.need-progress').textContent = `/${numRight}`;
  field.addEventListener('click', setOnCard);
};

const setEndFirstLevel = function (isVictory = false) {
  deleteTimer();
  field.removeEventListener('click', setOnCard); 
  while (field.firstChild) {
    field.firstChild.remove();
  }
  outGame();
  if (isVictory) {
    document.querySelector('.to-next-lvl').classList.remove('hidden');
    field.textContent = 'Победа! Можете перейти на следуюший уровень. Чтобы пройти уровень ещё раз, нажмите кнопку "Начать заново" дважды';
  }
};

export { setBeginFirstLevel, setEndFirstLevel }