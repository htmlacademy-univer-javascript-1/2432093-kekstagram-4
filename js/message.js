const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const hideError = () => {
  const errorContainer = document.querySelector('.error');
  if (errorContainer) {
    errorContainer.remove();
  }
};

const hideErrorOnMouseClick = (evt) => {
  const errorContainer = document.querySelector('.error__inner');
  if (evt.target !== errorContainer) {
    hideError();
  }
};

const showError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.querySelector('.error__button').addEventListener('click', hideError);
  document.addEventListener('keydown', onEscapeError);
  document.addEventListener('click', hideErrorOnMouseClick);
  document.body.append(errorMessage);
};

const hideSuccess = () => {
  document.removeEventListener('keydown', onEscapeSuccess);
  const successContainer = document.querySelector('.success');
  if (successContainer) {
    successContainer.remove();
  }
};

const successMouseClick = (evt) => {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    hideSuccess();
  }
};

const showSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  successMessage.querySelector('.success__button').addEventListener('click', hideSuccess);
  document.addEventListener('keydown', onEscapeSuccess);
  document.addEventListener('click', successMouseClick);
  document.body.append(successMessage);
};

function onEscapeSuccess(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccess();
    document.removeEventListener('keydown', onEscapeError);
  }
}

function onEscapeError(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideError();
  }
}

export { showError, showSuccess };
