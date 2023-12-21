import { resetScale } from './scaling.js';
import { resetEffects } from './effects.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALID_SYMBOLS_REGEX = /^[a-zA-Z0-9_#]+$/;
const HASHTAG_MAX_COUNT = 5;
const ERROR_TEXT = {
  NOT_VALID: 'Хэштег не является допустимым',
  REACHED_MAX_COUNT: 'Достигнуто максимальное количество хэштегов',
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
};

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInput = uploadFormElement.querySelector('#upload-file');

const imageOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = uploadFormElement.querySelector('#upload-cancel');

const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentsFieldElement = uploadFormElement.querySelector('.text__description');

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const pristineForm = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getSplitHashtags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const isHashtagValid = (value) => getSplitHashtags(value).every((tag) => VALID_SYMBOLS_REGEX.test(tag));

const hasReachedHashtagLimit = (value) => getSplitHashtags(value).length <= HASHTAG_MAX_COUNT;

const areHashtagsUnique = (value) => {
  const lowerCaseTags = getSplitHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristineForm.addValidator(
  hashtagsFieldElement,
  isHashtagValid,
  ERROR_TEXT.NOT_VALID,
  3,
  true
);

pristineForm.addValidator(
  hashtagsFieldElement,
  hasReachedHashtagLimit,
  ERROR_TEXT.REACHED_MAX_COUNT,
  2,
  true
);

pristineForm.addValidator(
  hashtagsFieldElement,
  areHashtagsUnique,
  ERROR_TEXT.NOT_UNIQUE,
  1,
  true
);

const hideImageModal = () => {
  imageOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadFormElement.reset();
  pristineForm.reset();
  closeButtonElement.removeEventListener('click', hideImageModal);
};

const documentOnKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', documentOnKeydown);
  }
};

const showImageModal = () => {
  imageOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  resetScale();
  resetEffects();

  document.addEventListener('keydown', documentOnKeydown);
  closeButtonElement.addEventListener('click', hideImageModal);
};

const changeEffectPreviewImage = (newImage) => {
  effectsPreview.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = `url('${newImage}')`;
  });
};

const showImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const isValidType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (file && isValidType) {
    const imageUrl = URL.createObjectURL(file);
    imagePreviewElement.src = imageUrl;
    changeEffectPreviewImage(imageUrl);
  }
};

const uploadOnChange = (evt) => {
  showImage(evt);
  showImageModal();
};

uploadFile.addEventListener('change', uploadOnChange);

commentsFieldElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

hashtagsFieldElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const blockSubmitButton = () => {
  buttonCloseOverlay.disabled = true;
  buttonCloseOverlay.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseOverlay.disabled = false;
  buttonCloseOverlay.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristineForm.validate()) {
      blockSubmitButton();
      await callback(new FormData(uploadFormElement));
      unblockSubmitButton();
    }
  });
};

export { setOnFormSubmit, hideImageModal };
