//Модуль вспомогательных функции
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // Генерируем случайное число в заданном диапазоне

export function generateRandomComment() {
  const id = getRandomInt(1, 1000);
  const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
  const message = commentsList[getRandomInt(0, commentsList.length - 1)];
  const name = 'Пользователь ' + id;
  return { id, avatar, message, name };
} // Генерируем случайный комментарий
