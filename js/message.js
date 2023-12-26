import { showImageModal } from './add-form.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const onErrorButtonClick = () => {
  showImageModal();
};

const removeEvtListenersError = () => {
  const errorButton = document.querySelector('.error__button');
  errorButton.removeEventListener('click', onErrorButtonClick);

  document.removeEventListener('keydown', onErrorMessageEscape);
  document.removeEventListener('click', onErrorMessageClick);
};

const hideErrorMessage = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer) {
    removeEvtListenersError();
    errorContainer.remove();
  }
};

function onErrorMessageClick(evt) {
  const errorContainer = document.querySelector('.success_button');

  if (evt.target !== errorContainer) {
    hideErrorMessage();
  }
}

const showErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  const errorButton = message.querySelector('.error__button');

  errorButton.addEventListener('click', onErrorButtonClick);

  document.addEventListener('keydown', onErrorMessageEscape);
  document.addEventListener('click', onErrorMessageClick);

  document.body.append(message);
};

const hideSuccessMessage = () => {
  document.removeEventListener('keydown', onSuccessMessageEscape);
  const successContainer = document.querySelector('.success');

  if (successContainer) {
    document.querySelector('.success__button').remove('click', hideSuccessMessage);
    document.removeEventListener('keydown', onSuccessMessageEscape);
    document.removeEventListener('click', onSuccessMouseClick);
    successContainer.remove();
  }
};

function onSuccessMouseClick(evt) {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    hideSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const message = successMessage.cloneNode(true);
  message.querySelector('.success__button').addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscape);
  document.addEventListener('click', onSuccessMouseClick);
  document.body.append(message);
};

function onSuccessMessageEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

function onErrorMessageEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideErrorMessage();
    document.removeEventListener('keydown', onErrorMessageEscape);
  }
}

export { showErrorMessage, showSuccessMessage };
