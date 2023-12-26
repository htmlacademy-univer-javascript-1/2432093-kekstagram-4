import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constant.js';

const modal = document.querySelector('.img-upload');
const scaleInput = modal.querySelector('.scale__control--value');

const makeSmallerButton = modal.querySelector('.scale__control--smaller');
const makeBiggerButton = modal.querySelector('.scale__control--bigger');
const image = modal.querySelector('.img-upload__preview img');

scaleInput.value = `${DEFAULT_SCALE}%`;

const scaleImage = (value) => {
  scaleInput.value = `${value}%`;
  image.style.transform = `scale(${value / 100})`;
};

const makeImageSmaller = () => {
  const currentValue = Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE);
  scaleImage(currentValue);
};

const makeImageBigger = () => {
  const currentValue = Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE);
  scaleImage(currentValue);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

makeSmallerButton.addEventListener('click', makeImageSmaller);
makeBiggerButton.addEventListener('click', makeImageBigger);

export { resetScale };
