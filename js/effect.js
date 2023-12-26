import { Effects } from './constant.js';
import { roundString } from './utils.js';

const modal = document.querySelector('.img-upload');

const imageUpload = modal.querySelector('.img-upload__preview img');
const effects = modal.querySelector('.effects');
const effectSlider = modal.querySelector('.effect-level__slider');
const sliderWrapper = modal.querySelector('.img-upload__effect-level');

const effectLevel = modal.querySelector('.effect-level__value');

const DEFAULT_EFFECT = Effects.NONE;
let chosenEffect = DEFAULT_EFFECT;

noUiSlider.create(effectSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

const openSlider = () => {
  sliderWrapper.classList.remove('hidden');
};

const closeSlider = () => {
  sliderWrapper.classList.add('hidden');
};

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions(
    {
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });

  if (chosenEffect === DEFAULT_EFFECT) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const chosenEffectName = `${evt.target.value}`.toUpperCase();
  chosenEffect = Effects[chosenEffectName];
  imageUpload.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = roundString(effectSlider.noUiSlider.get());

  if (chosenEffect === DEFAULT_EFFECT) {
    imageUpload.style.filter = DEFAULT_EFFECT.style;
  } else {
    imageUpload.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }

  effectLevel.value = sliderValue;
};

const reset = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

effects.addEventListener('change', onEffectsChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export { reset };
