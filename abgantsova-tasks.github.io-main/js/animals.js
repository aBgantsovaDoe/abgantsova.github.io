document.addEventListener("DOMContentLoaded", () => {
  from_start();
  rotateOnKey();

  let timer =setInterval(function () {
      if (!check())
      {
          win();
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
const main = document.getElementsByClassName('main').item(0);
const birds = document.getElementsByClassName("bird");
const beasts = document.getElementsByClassName("beast");
var content = document.querySelector(".content"); 

elements = [
  new element(0, 0, 180),
  new element(100, 225, 225),
  new element(325, 350, -90),
  new element(40, 450, 45),
  new element(450, 50, -135),
  new element(250, 30, 315)];

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
  
  function drag(e) {
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
              fig.style.left = Math.max(0, Math.min(e.pageX - shiftX, content.getBoundingClientRect().left + content.offsetWidth - fig.offsetWidth)- content.getBoundingClientRect().left) + 'px';
              fig.style.top = Math.max(0, Math.min(e.pageY - shiftY, content.getBoundingClientRect().top + content.offsetHeight - fig.offsetHeight) - content.getBoundingClientRect().top) + 'px';
            };
          fig.onmouseup = () => {
              document.onmousemove = null;
          };
          function getCoords(fig) {
              let x = fig.getBoundingClientRect();
              return {
                  top: x.top + pageXOffset,
                  left: x.left + pageYOffset
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

function win() {
    for (let i = 0; i < 6; i++) {
        picture.item(i).style.border = 0;
        picture.item(i).animate([
            {transform: 'rotate(' + 45 + 'deg)'},
            {transform: 'rotate(' + (-90) + 'deg)'},
            {transform: 'rotate(' + 90 + 'deg)'},
            {transform: 'rotate(' + (-90) + 'deg)'},
            {transform: 'rotate(' + 90 + 'deg)'},
            {transform: 'rotate(' + (-90) + 'deg)'},
            {transform: 'rotate(' + 45 + 'deg)'}
        ], 1500);
    }
}