import { FullScreenModule } from './fullScreen.js';
import { PictureModule } from './thumbnail.js';
import { setOnFormSubmit, hideImageModal } from './add-form.js';
import { showError, showSuccess } from './message.js';
import { getData, sendData } from './api.js';
import { showFilterButtons } from './filter.js';
import { debounce } from './utils.js';

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

  const debouncedRenderThumbnail = debounce(renderThumbnail);

  showFilterButtons(pictures, debouncedRenderThumbnail);
});
