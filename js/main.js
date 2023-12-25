import { renderThumbnail } from './render-thumbnail.js';
import { onFormSubmit } from './add-form.js';
import { getData } from './api.js';
import { showFilterButtons } from './filter.js';
import { debounce } from './utils.js';

getData().then((pictures) => {
  const debouncedRenderThumbnail = debounce(renderThumbnail);
  renderThumbnail(pictures);
  showFilterButtons(pictures, debouncedRenderThumbnail);
});

onFormSubmit();
