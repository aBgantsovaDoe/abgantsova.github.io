//import './data.js';
//собрать данные из формы
//const form = document.querySelector('#authorization');

import { putCurrentInStorage } from "./util.js";

const signIn = function () {
  const userName = document.querySelector('#name').value;
  const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
  const CURRENT_USER = {
    name: userName,
    score: 0,
    level: 1,
    difficulty: difficulty,
  }
  putCurrentInStorage(CURRENT_USER);
  window.location.href = '../index.html';
};

submit.onclick = function (evt) {
  evt.preventDefault();
  signIn();
};
