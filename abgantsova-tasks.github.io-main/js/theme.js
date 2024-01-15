const theme = document.querySelector('#theme');
const changeTheme = function () {
  document.body.classList.toggle('green-mode');
  document.querySelector('button').classList.toggle('green-mode');
}
const cur = JSON.parse(localStorage.getItem('theme'));
if (cur === 'green') changeTheme();

theme.addEventListener('click', (evt) => {
  evt.preventDefault();
  changeTheme();
  if (document.body.classList.contains('green-mode')) localStorage.setItem('theme', JSON.stringify('green'));
  else localStorage.setItem('theme', JSON.stringify('blue'));
})
