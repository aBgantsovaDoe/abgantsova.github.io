let menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", function () {
  //console.log("Клик по кнопке меню")
  document.querySelector(".header__wrapper--bottom").classList.toggle("mobile");
});

document.addEventListener("DOMContentLoaded", () => {
  from_start();
  rotateOnKey();

  let timer =setInterval(function () {
      if (!check())
      {
          alert('Молодец! Все верно разгруппировал!');
          clearInterval(timer);
      }
    },2000);
});


class element {
  constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.cur_angle = angle;
  }
}

const figure = document.getElementsByClassName('figure');
const picture = document.getElementsByClassName('pic');
const check_button = document.getElementById("check");
const try_again = document.getElementById("start");
const main = document.getElementsByClassName('main').item(0);
const bird_area = document.getElementById("bird_area");
const beast_area = document.getElementById("beast_area");
const birds = document.getElementsByClassName("bird");
const beasts = document.getElementsByClassName("beast");

elements = [
  new element(110, 100, 180),
  new element(920, 1000, 225),
  new element(890, 250, -90),
  new element(570, 500, 45),
  new element(650, 50, -135),
  new element(200, 800, 315)];

function from_start() {
  for (let i = 0; i < 6; i++) {
      from_start1(figure.item(i), picture.item(i), i);
  }
  move();
  function from_start1(fig, pic, i) {
      elements[i].inItsArea = false;
      fig.style.left = elements[i].x + "px";
      fig.style.top = elements[i].y + "px";
      rotate(pic, i, elements[i].angle);
      pic.style.display = 'block';
      pic.style.border = 0;
  }
}

function move() {
  for (let i = 0; i < 6; i++) {
        moving(figure.item(i));
  }
  
  function moving(fig) {
      fig.ondragstart = () => {
          return false;
      };
      fig.onmousedown = (e) => {
          const coords = getCoords(fig);
          const shiftX = e.clientX - coords.left;
          const shiftY = e.clientY - coords.top;
          document.onmousemove = (e) => {
              fig.style.left = (e.clientX - shiftX) + 'px';
              fig.style.top = (e.clientY - shiftY) + 'px';
          };
          fig.onmouseup = () => {
              document.onmousemove = null;
          };

          function getCoords(fig) {
              let x = fig.getBoundingClientRect();
              return {
                  top: x.top + pageYOffset,
                  left: x.left + pageXOffset
              };
          }
      };
  }
}

function rotateOnKey() {
  for (let i = 0; i < 6; i++) {
      picture.item(i).onclick = () => {
          document.onkeydown = () => {
              rotate(picture.item(i), i, elements[i].cur_angle + 45);
          }
      }
  }
}

function rotate(pic, i, x) {
      pic.style.transform = 'rotate(' + x + 'deg)';
      elements[i].cur_angle = x;
}


function check() {
  let x = 0;
  for (let i = 1; i < 3; i++) {
      x += check1(i, i-1);
  }
  for (let i = 4; i < 6; i++) {
      x += check1(i, i-1);
  }
  if (x === 4) { return false;}
  else {return true;}

  function check1(i, j) {
      const fig1 = figure.item(i);
      const fig2 = figure.item(j);
      const x1 = fig1.offsetLeft;
      const y1 = fig1.offsetTop;
      const x2 = fig2.offsetLeft;
      const y2 = fig2.offsetTop;
      if (x2 < x1 + fig1.offsetWidth &&
          x2 + fig1.offsetWidth > x1 &&
          y2 < y1 + fig1.offsetHeight &&
          y2 + fig2.offsetHeight > y1
          && elements[i].cur_angle % 360 === 0 && elements[j].cur_angle % 360 === 0) {
          return 1;
      }
      return 0;
  }
}