import { renderBigPicture } from './render-big-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');

const getThumbnailFromTemplate = (pictureInfo) => {
  const picture = thumbnailTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = pictureInfo.url;
  picture.querySelector('.picture__img').alt = pictureInfo.description;
  picture.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
  picture.querySelector('.picture__likes').textContent = pictureInfo.likes;
  picture.dataset.id = pictureInfo.id;

  return picture;
};

const clearPictures = () => {
  const picturesElements = thumbnailsContainer.querySelectorAll('.picture');
  picturesElements.forEach((picture) => {
    picture.remove();
  });
};

const renderThumbnail = (picturesInfo) => {
  clearPictures();
  const fragment = document.createDocumentFragment();

  picturesInfo.forEach((pictureInfo) => {
    const newThumbnail = getThumbnailFromTemplate(pictureInfo);
    fragment.append(newThumbnail);
  });


  thumbnailsContainer.appendChild(fragment);
  renderBigPicture(picturesInfo);
};

export { renderThumbnail };
