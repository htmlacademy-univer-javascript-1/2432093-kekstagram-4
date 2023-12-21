//Модуль вспомогательных функции
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // Генерируем случайное число в заданном диапазоне

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export { debounce, throttle };