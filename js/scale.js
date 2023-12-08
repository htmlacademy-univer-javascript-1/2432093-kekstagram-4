const DEFAULT_SCALE = 100;
const SCALE_STEP = 10;
const MINIMUM_SCALE = 0;
const MAXIMUM_SCALE = 100;

const imageUploadContainer = document.querySelector('.img-upload');
const scaleInput = imageUploadContainer.querySelector('.scale__control--value');
const decreaseScaleButton = imageUploadContainer.querySelector('.scale__control--smaller');
const increaseScaleButton = imageUploadContainer.querySelector('.scale__control--bigger');
const previewImage = imageUploadContainer.querySelector('.img-upload__preview img');

scaleInput.value = `${DEFAULT_SCALE}%`;

const updateScale = (value) => {
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const decreaseImageScale = () => {
  const currentScale = Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MINIMUM_SCALE);
  updateScale(currentScale);
};

const increaseImageScale = () => {
  const currentScale = Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAXIMUM_SCALE);
  updateScale(currentScale);
};

const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

decreaseScaleButton.addEventListener('click', decreaseImageScale);
increaseScaleButton.addEventListener('click', increaseImageScale);

export { resetScale };
