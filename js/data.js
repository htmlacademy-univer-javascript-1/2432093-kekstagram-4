//Модуль создания данных
import { generateRandomComment, getRandomInt } from './util.js';

const commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export function createPhotosData() {
  const photos = [];
  const usedIDs = new Set();

  for (let i = 1; i <= 25; i++) {
    const id = getRandomInt(1, 25);
    if (usedIDs.has(id)) {
      i--;
      continue;
    }
    usedIDs.add(id);

    const url = `photos/${i}.jpg`;
    const description = `Описание фотографии №${i}`;
    const likes = getRandomInt(15, 200);
    const numComments = getRandomInt(0, 30);
    const comments = [];

    for (let j = 0; j < numComments; j++) {
      comments.push(generateRandomComment());
    }

    const photoObj = {
      id,
      url,
      description,
      likes,
      comments
    };

    photos.push(photoObj);
  }

  return photos;
}

export function generateRandomComment() {
  const id = getRandomInt(1, 1000);
  const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
  const message = commentsList[getRandomInt(0, commentsList.length - 1)];
  const name = 'Пользователь ' + id;
  return { id, avatar, message, name };
} // Генерируем случайный комментарий
