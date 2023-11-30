import { generateRandomComment } from './data.js';

export const FullScreenModule = (function () {
  let closeBtn;

  function updateFullScreenContent(photos) {
    const fullScreenElement = document.querySelector('.big-picture');

    const imgElement = fullScreenElement.querySelector('.big-picture__img');
    imgElement.src = photos.url;

    fullScreenElement.querySelector('.likes-count').textContent = photos.likes;
    fullScreenElement.querySelector('.comments-count').textContent = photos.comments.length;

    const captionElement = fullScreenElement.querySelector('.social__caption');
    captionElement.textContent = photos.description;

    const commentsContainer = fullScreenElement.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    photos.comments.forEach(commentData => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const avatarElement = document.createElement('img');
      avatarElement.classList.add('social__picture');
      avatarElement.src = commentData.avatar;
      avatarElement.alt = commentData.name;
      avatarElement.width = 35;
      avatarElement.height = 35;

      const textElement = document.createElement('p');
      textElement.classList.add('social__text');
      textElement.textContent = commentData.message;

      commentElement.appendChild(avatarElement);
      commentElement.appendChild(textElement);

      commentsContainer.appendChild(commentElement);
    });

    fullScreenElement.classList.remove('hidden');
  }

  function openFullScreen(photos) {
    if (photos.comments.length === 0) {
      for (let i = 0; i < 5; i++) {
        photos.comments.push(generateRandomComment());
      }
    }

    updateFullScreenContent(photos);

    document.addEventListener('keydown', handleKeyDown);
    closeBtn = document.querySelector('.big-picture__cancel');
    closeBtn.addEventListener('click', closeFullScreen);
  }

  function closeFullScreen() {
    const fullScreenElement = document.querySelector('.big-picture');
    fullScreenElement.classList.add('hidden');
    closeBtn.removeEventListener("click", closeFullScreen);
    document.removeEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(evt) {
    if (evt.key === 'Escape') {
      closeFullScreen();
    }
  }

  return {
    openFullScreen: openFullScreen,
  };
})();
