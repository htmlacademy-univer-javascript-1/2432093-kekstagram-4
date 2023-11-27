//Файл - точка входа
//import { generateRandomComment, getRandomInt } from './util.js';
//Возможно лишнее сейчас, тк импорт для createPhotosData написан в data.js
import { createPhotosData } from './data.js';
import { PictureModule } from './thumbnail.js';
import { FullScreenModule } from './fullScreen.js';

const photos = createPhotosData();

PictureModule.renderPictures(photos);

const thumbnailElements = document.querySelectorAll('.picture');
thumbnailElements.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    FullScreenModule.openFullScreen(photos[index]);
  });
});
