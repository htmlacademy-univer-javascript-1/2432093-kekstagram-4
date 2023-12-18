import { FullScreenModule } from './fullScreen.js';
import { PictureModule } from './thumbnail.js';
import { setOnFormSubmit, hideImageModal } from './add-form.js';
import { showError, showSuccess } from './message.js';
import { getData, sendData } from './api.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideImageModal();
    showSuccess();
  } catch (error) {
    showError();
  }
});

getData().then((pictures) => {
  PictureModule().renderPictures(photos);

  const thumbnailElements = document.querySelectorAll('.picture');
  thumbnailElements.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      FullScreenModule.openFullScreen(photos[index]);
    });
  });
});
