const Effects = {
  NONE: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  CHROME: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  SEPIA: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  MARVIN: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  PHOBOS: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  HEAT: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const imageUploadContainer = document.querySelector('.img-upload');

const previewImage = imageUploadContainer.querySelector('.img-upload__preview img');
const effectsContainer = imageUploadContainer.querySelector('.effects');
const effectSliderElement = imageUploadContainer.querySelector('.effect-level__slider');
const sliderWrapperElement = imageUploadContainer.querySelector('.img-upload__effect-level');

const effectLevelElement = imageUploadContainer.querySelector('.effect-level__value');

const DEFAULT_EFFECT = Effects.NONE;
let selectedEffect = DEFAULT_EFFECT;

noUiSlider.create(effectSliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

const openEffectSlider = () => {
  sliderWrapperElement.classList.remove('hidden');
};

const closeEffectSlider = () => {
  sliderWrapperElement.classList.add('hidden');
};

const updateEffectSlider = () => {
  effectSliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: selectedEffect.min,
        max: selectedEffect.max
      },
      step: selectedEffect.step,
      start: selectedEffect.max
    });

  if (selectedEffect === DEFAULT_EFFECT) {
    closeEffectSlider();
  } else {
    openEffectSlider();
  }
};

const handleEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const selectedEffectName = `${evt.target.value}`.toUpperCase();
  selectedEffect = Effects[selectedEffectName];
  previewImage.className = `effects__preview--${selectedEffect.name}`;
  updateEffectSlider();
};

const handleUpdateEffectSlider = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();

  if (selectedEffect === DEFAULT_EFFECT) {
    previewImage.style.filter = DEFAULT_EFFECT.style;
  } else {
    previewImage.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  }

  effectLevelElement.value = sliderValue;
};

const reset = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateEffectSlider();
};

effectsContainer.addEventListener('change', handleEffectsChange);
effectSliderElement.noUiSlider.on('update', handleUpdateEffectSlider);

export { reset };
