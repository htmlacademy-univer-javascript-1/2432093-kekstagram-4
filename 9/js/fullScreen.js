import { generateRandomComment } from './data.js';

export const FullScreenModule = (function () {
  const fullScreenElement = document.querySelector('.full-screen');
  const fullScreenImgElement = fullScreenElement.querySelector('.full-screen__img img');
  const fullScreenLikesCountElement = fullScreenElement.querySelector('.likes-count');
  const fullScreenSocialCaptionElement = fullScreenElement.querySelector('.social__caption');

  const fullScreenCommentsCountElement = fullScreenElement.querySelector('.comments-count');
  const fullScreenCommentsCountBlockElement = fullScreenElement.querySelector('.social__comment-count');
  const fullScreenCommentsLoaderElement = fullScreenElement.querySelector('.comments-loader');

  const commentTemplateElement = document.querySelector('.social__comment');
  const commentListElement = document.querySelector('.social__comments');
  let commentsToShowCount = 5;

  let currentPicture;

  const renderComment = (commentInfo) => {
    const newCommentElement = commentTemplateElement.cloneNode(true);

    newCommentElement.querySelector('.social__picture').src = commentInfo.avatar;
    newCommentElement.querySelector('.social__picture').alt = commentInfo.name;
    newCommentElement.querySelector('.social__text').textContent = commentInfo.message;

    return newCommentElement;
  };

  const hideCommentLoadButton = () => {
    fullScreenCommentsLoaderElement.classList.add('hidden');
  };

  const showCommentLoadButton = () => {
    fullScreenCommentsLoaderElement.classList.remove('hidden');
  };

  const changeCommentCount = (currentShownCommentsCount, pictureCommentsCount) => {
    const newMessage = `${currentShownCommentsCount} из ${pictureCommentsCount} комментариев`;
    fullScreenCommentsCountBlockElement.textContent = newMessage;
  };

  const renderComments = () => {
    commentListElement.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const shownComments = [];

    showCommentLoadButton();

    for (const commentInfo of currentPicture.comments) {
      if (shownComments.length < commentsToShowCount) {
        shownComments.push(commentInfo);
        fragment.append(renderComment(commentInfo));
      }
    }
    if (shownComments.length >= currentPicture.comments.length) {
      hideCommentLoadButton();
      fullScreenCommentsLoaderElement.removeEventListener('click', commentsLoaderOnclick);
    }
    changeCommentCount(shownComments.length, currentPicture.comments.length);
    commentListElement.append(fragment);
  };

  function commentsLoaderOnclick() {
    commentsToShowCount += 5;
    renderComments();
  }

  const fillPictureDetails = (clickedPicture) => {
    currentPicture = clickedPicture;
    commentsToShowCount = 5;

    fullScreenCommentsLoaderElement.addEventListener('click', commentsLoaderOnclick);

    fullScreenImgElement.src = currentPicture.url;
    fullScreenLikesCountElement.textContent = currentPicture.likes;
    fullScreenCommentsCountElement.textContent = currentPicture.comments.length;
    fullScreenSocialCaptionElement.textContent = currentPicture.description;

    renderComments();
  };

  function openFullScreen(photos) {
    if (photos.comments.length === 0) {
      photos.comments = generateRandomComment();
    }

    currentPicture = photos;
    commentsToShowCount = 5;

    fullScreenElement.classList.remove('hidden');
    fillPictureDetails(photos);

    document.addEventListener('keydown', handleKeyDown);
    const closeBtn = fullScreenElement.querySelector('.big-picture__cancel');
    closeBtn.addEventListener('click', closeFullScreen);
  }

  function closeFullScreen() {
    fullScreenElement.classList.add('hidden');
    fullScreenCommentsLoaderElement.removeEventListener('click', commentsLoaderOnclick);
    document.removeEventListener('keydown', handleKeyDown);
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

