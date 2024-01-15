// Массивы латинских высказываний и их переводов
var latinPhrases = [
  "\"Consuetudo est altera natura\"",
  "\"Nota bene\"",
  "\"Nulla calamitas sola\"",
  "\"Per aspera ad astra\""
];
var translationPhrases = [
  "\"Привычка - вторая натура\"",
  "\"Заметьте хорошо!\"",
  "\"Беда не приходит одна\"",
  "\"Через тернии к звёздам\""
];

// Классы для фонового цвета
var class1 = "background-color1";
var class2 = "background-color2";

// Переменная для отслеживания нажатий на кнопку
var counter = 0;

// Функция для создания нового элемента при нажатии на кнопку "Создать"
function createNewElement() {

  var randomIndex = Math.floor(Math.random() * latinPhrases.length);

  if (latinPhrases.length === 0) {
    alert("Фразы закончились");
    return;
  }

  var element = document.createElement("p");
  element.id = "new-element-" + counter;
   
  var elementNumber = document.createElement("span");
  elementNumber.style.textDecoration = "underline";
  elementNumber.textContent = "n=" + counter;
  element.appendChild(elementNumber);
  
  var latinElement = document.createElement("span");
  latinElement.style.fontStyle = "italic";
  latinElement.textContent = " " + latinPhrases[randomIndex];
  element.appendChild(latinElement);
   
  var russianElement = document.createElement("span");
  russianElement.style.fontStyle = "normal";
  russianElement.textContent =  " " + translationPhrases[randomIndex];
  element.appendChild(russianElement);

  latinPhrases.splice(randomIndex, 1);
  translationPhrases.splice(randomIndex, 1);
  
  var randDiv = document.getElementById("rand");
  
  // Устанавливаем класс для фона в зависимости от счетчика
  if (counter % 2 === 0) {
    element.classList.add(class1);
  } else {
    element.classList.add(class2);
  }
  randDiv.appendChild(element);
  counter++;
}

// Функция для изменения жирности при нажатии на кнопку
function changeBackground() {
  const container = document.querySelector("#rand");
  const matches = container.querySelectorAll("p");
  if (matches.length > 0) {
    for (let el = 0; el < matches.length; el++) {
      if(!(el % 2)) {
        matches[el].style.fontWeight = "bold";
      }
    }
  } 
}

