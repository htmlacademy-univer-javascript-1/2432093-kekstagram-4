import { Filters, FILTER_PICTURES_COUNT } from './constant.js';

const filterFormElement = document.querySelector('.img-filters');
const activeClass = 'img-filters__button--active';

let currentFilter = Filters.DEFAULT;
let pictures = [];

const removeActiveStateFromCurrentFilter = () => {
  const currentActiveFilter =
    filterFormElement.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove(activeClass);
};

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, FILTER_PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const onFilterClick = (callback) => {
  filterFormElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    removeActiveStateFromCurrentFilter();
    clickedButton.classList.add(activeClass);
    currentFilter = clickedButton.id;

    callback(getFilteredPictures());
  });
};

const showFilterButtons = (loadedPictures, callback) => {
  filterFormElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];

  onFilterClick(callback);
};

export { showFilterButtons };
