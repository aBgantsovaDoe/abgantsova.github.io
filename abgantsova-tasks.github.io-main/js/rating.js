//import './data.js';

//key - name, value - score
let USERS = JSON.parse(localStorage.getItem('users'));

const current_user = JSON.parse(localStorage.getItem('user'));
USERS[current_user['name']] = current_user['score'];

const list = document.querySelector('.list');

const template = document.querySelector('#list-item-template');

//descenging
function compareUsers(a, b) {
  if (a[1] > b[1]) return -1;
  if (a[1] == b[1]) return 0;
  if (a[1] < b[1]) return 1;
}

let sortUsers = Object.entries(USERS);

sortUsers.sort(compareUsers);

for (let i = 0; i < sortUsers.length; i++) {
  const item = template.content.cloneNode(true);
  item.querySelector('.name').textContent = sortUsers[i][0];
  item.querySelector('.score').textContent = sortUsers[i][1];
  list.appendChild(item);
}