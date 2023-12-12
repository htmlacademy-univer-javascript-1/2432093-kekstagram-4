import { resetScale } from './scale.js';
import { reset } from './effects.js';

const validSymbolsRegex = /^[a-zA-Z0-9_#]+$/;
const hashtagMaxCount = 5;
const errorText = {
  NOT_VALID: 'Хэштег не является допустимым',
  REACHED_MAX_COUNT: 'Достигнуто максимальное количество хэштегов',
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
};

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInput = uploadFormElement.querySelector('#upload-file');

const imageOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeOverlayButton = uploadFormElement.querySelector('#upload-cancel');

const hashtagsFieldInput = uploadFormElement.querySelector('.text__hashtags');
const commentsFieldInput = uploadFormElement.querySelector('.text__description');

const pristineFormValidator = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getValidHashtags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);
const isValidHashtag = (value) => getValidHashtags(value).every((tag) => validSymbolsRegex.test(tag));
const hasExceededHashtagLimit = (value) => getValidHashtags(value).length <= hashtagMaxCount;
const areHashtagsDistinct = (value) => {
  const lowerCaseTags = getValidHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristineFormValidator.addValidator(
  hashtagsFieldInput,
  isValidHashtag,
  errorText.NOT_VALID,
  2,
  true
);

pristineFormValidator.addValidator(
  hashtagsFieldInput,
  hasExceededHashtagLimit,
  errorText.REACHED_MAX_COUNT,
  2,
  true
);

pristineFormValidator.addValidator(
  hashtagsFieldInput,
  areHashtagsDistinct,
  errorText.NOT_UNIQUE,
  1,
  true
);

const hideImageOverlay = () => {
  imageOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadFormElement.reset();
  pristineFormValidator.reset();
  closeOverlayButton.removeEventListener('click', hideImageOverlay);
};

const handleKeydownEvent = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageOverlay();
    document.removeEventListener('keydown', handleKeydownEvent);
  }
};

const showImageOverlay = () => {
  imageOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', handleKeydownEvent);
  closeOverlayButton.addEventListener('click', hideImageOverlay);
  resetScale();
  reset();
}

uploadFileInput.addEventListener('input', showImageOverlay);

uploadFormElement.addEventListener('submit', (event) => { });

commentsFieldInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

hashtagsFieldInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
