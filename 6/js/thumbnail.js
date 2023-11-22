// Модуль отвечающий за отрисовку миниатюр
const PictureModule = (function () {
  // Функция для создания DOM-элемента фотографии
  function createPictureElement(pictureData) {
    const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    const pictureElement = pictureTemplate.querySelector('.picture');

    // Заполнение данными
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = pictureData.url;
    imgElement.alt = pictureData.description;

    pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.lenght;

    return pictureElement;
  }

  // Функция для отрисовки фотографий в блок .pictures
  function renderPictures(picturesData) {
    const fragment = document.createDocumentFragment();
    const picturesContainer = document.querySelector('.pictures');

    picturesData.forEach((pictureData) => {
      const pictureElement = createPictureElement(pictureData);
      fragment.appendChild(pictureElement);
    });

    picturesContainer.appendChild(fragment);
  }

  return {
    renderPictures: renderPictures,
  };
});
