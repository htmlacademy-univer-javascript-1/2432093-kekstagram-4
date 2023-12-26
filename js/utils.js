const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const roundString = (inputString) => {
  const parsedNumber = parseFloat(inputString);

  if (parsedNumber % 1 !== 0) {
    return parsedNumber.toFixed(1);
  } else {
    return Math.round(parsedNumber).toString();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomElement, getRandomInteger, debounce, roundString };
