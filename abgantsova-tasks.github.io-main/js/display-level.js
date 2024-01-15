import { WORDS } from "./data.js";
import { getRandomArrayElements } from "./util.js";

const FIRST_WORDS_NUMBER = 30;
const SECOND_WORDS_NUMBER = 18;

const templateCard = document.querySelector('#template-card').content;
const templateZone = document.querySelector('#template-zone').content;
const field = document.querySelector('.field');

function displayZone () {
  for (let i = 0; i < 3; i++) {
    const zone = templateZone.cloneNode(true);
    switch (i) {
      case 1: 
        zone.firstElementChild.classList.add('pool');
        break;
      case 0:
        zone.firstElementChild.id = 'l-zone';
        break;
      case 2:
        zone.firstElementChild.id = 'r-zone';
        break;  
    }
    field.append(zone);
  }
};

function displayCards(difficulty, level = 1) { 
  const lvlWords = level === 1 ? getRandomArrayElements(WORDS.slice(), FIRST_WORDS_NUMBER) 
                               : getRandomArrayElements(WORDS.slice(), SECOND_WORDS_NUMBER);
  let numRight = 0;
  switch (difficulty) {
    case 'easy':
      switch (level) {
        case 1: 
          lvlWords.forEach(element => {
            const card = templateCard.cloneNode(true);
            card.querySelector('.word').textContent = element.value;
            card.querySelector('.ans').textContent = element.easyFirst;
            field.append(card);
            numRight += element.easyFirst;
          });
          break;
        case 2: 
          // 2 lvl - меньше 2-х слогов - 1, не меньше 3х - 2
          displayZone();
          const pool = field.querySelector('.pool');
          lvlWords.forEach(element => {
            const card = templateCard.cloneNode(true);
            card.querySelector('.word').textContent = element.value;
            card.querySelector('.ans').textContent = element.easySecond;
            card.firstElementChild.id = numRight;
            card.firstElementChild.draggable = true;
            pool.append(card);
            numRight++;
          });
          break;
      }      
      break;
    case 'hard':
      switch (level) {
        case 1: 
          lvlWords.forEach(element => {
            const card = templateCard.cloneNode(true);
            card.querySelector('.word').textContent = element.value;
            card.querySelector('.ans').textContent = element.hardFirst;
            field.append(card);
            numRight += element.hardFirst;
          });
          break;
        case 2: 
          // 2 lvl - мужской род = 1, женский и средний - 2
          displayZone();
          const pool = field.querySelector('.pool');
          lvlWords.forEach(element => {
            const card = templateCard.cloneNode(true);
            card.querySelector('.word').textContent = element.value;
            card.querySelector('.ans').textContent = element.hardSecond;
            card.firstElementChild.id = numRight;
            card.firstElementChild.draggable = true;
            pool.append(card);
            numRight++;
          });
          break;
      }
      break;
  }
  return numRight;
};

const onOffButton = document.querySelector('.onOffButton');

function inGame () {
  onOffButton.classList.replace('off', 'on');
  document.querySelector('.rating').classList.add('hidden');
  document.querySelector('.timer').classList.remove('hidden');
  document.querySelector('.onOffButton').textContent = 'Остановить';
}

function outGame () {
  onOffButton.classList.replace('on', 'off');
  document.querySelector('.rating').classList.remove('hidden');
  document.querySelector('.timer').classList.add('hidden');
  document.querySelector('.onOffButton').textContent = 'Начать заново';
}

export {displayCards, displayZone, inGame, outGame};