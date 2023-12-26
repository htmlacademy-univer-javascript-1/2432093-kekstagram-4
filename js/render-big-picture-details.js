import { COMMENTS_LOAD_COUNT } from './constant.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCountBlock = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

const comment = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');
let shownCommentsCount = COMMENTS_LOAD_COUNT;

let currentPicture;

const renderComment = (commentInfo) => {
  const newComment = comment.cloneNode(true);

  newComment.querySelector('.social__picture').src = commentInfo.avatar;
  newComment.querySelector('.social__picture').alt = commentInfo.name;
  newComment.querySelector('.social__text').textContent = commentInfo.message;

  return newComment;
};

const hideCommentLoadButton = () => {
  bigPictureCommentsLoader.classList.add('hidden');
};

const showCommentLoadButton = () => {
  bigPictureCommentsLoader.classList.remove('hidden');
};

const changeCommentCount = (currentShownCommentsCount, pictureCommentsCount) => {
  const newMessage = `${currentShownCommentsCount} из ${pictureCommentsCount} комментариев`;
  bigPictureCommentsCountBlock.textContent = newMessage;
};

const renderComments = () => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const shownComments = [];

  showCommentLoadButton();

  currentPicture.comments.forEach((commentInfo) => {
    if (shownComments.length < shownCommentsCount) {
      shownComments.push(commentInfo);
      fragment.append(renderComment(commentInfo));
    }
  });

  if (shownComments.length >= currentPicture.comments.length) {
    hideCommentLoadButton();
    bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
  changeCommentCount(shownComments.length, currentPicture.comments.length);
  commentList.append(fragment);
};

function onCommentsLoaderClick() {
  shownCommentsCount += COMMENTS_LOAD_COUNT;
  renderComments();
}

const fillPictureDetails = (clickedPicture) => {
  currentPicture = clickedPicture;
  shownCommentsCount = COMMENTS_LOAD_COUNT;

  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);

  bigPictureImg.src = currentPicture.url;
  bigPictureLikesCount.textContent = currentPicture.likes;
  bigPictureCommentsCount.textContent = currentPicture.comments.length;
  bigPictureSocialCaption.textContent = currentPicture.description;

  renderComments();
};

export { fillPictureDetails };
