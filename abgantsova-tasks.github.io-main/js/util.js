function getRandom (min, max) {
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min;
}

const getRandomArrayElements = (array, count) => {
  const res = [];
  for (let i = 0; i < count; i++) {
    const element = array[getRandom(0, array.length - 1)];
    res.push(element);
    array.splice(array.indexOf(element), 1);
  }
  return res;
};
const getCurrentFromStorage = function () {
  return JSON.parse(localStorage.getItem('user'));
}

const putCurrentInStorage = function (user) {
  localStorage.setItem('user', JSON.stringify(user));
};

export {getRandomArrayElements, putCurrentInStorage, getCurrentFromStorage};