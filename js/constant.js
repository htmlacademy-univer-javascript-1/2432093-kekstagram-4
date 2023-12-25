const IMAGE_COUNT = 25;
const COMMENTS_LOAD_COUNT = 5;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_COUNT = 5;

const URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  NOT_VALID: 'Хэштег должен начинаться с # и состоять из букв или цифр',
  REACHED_MAX_COUNT: 'Максимум 5 хэштегов'
};

const ServerErrorText = {
  GET_DATA: 'Данные не загрузились',
  POST_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const FILTER_PICTURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

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

export {
  IMAGE_COUNT, COMMENTS_LOAD_COUNT, HASHTAG_MAX_COUNT, VALID_SYMBOLS,
  ErrorText, SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE, Effects,
  ServerErrorText, Method, Route, URL, Filters, FILTER_PICTURES_COUNT,
  SubmitButtonText, FILE_TYPES
};
