//Файл - точка входа
//Данный импорт нужен был в прошлом задании
//import { generateRandomComment, getRandomInt } from './util.js';
//Возможно лишнее сейчас, тк импорт для createPhotosData написан в data.js
import { createPhotosData } from './data.js';
import { PictureModule } from './thumbnail.js';

const photos = createPhotosData();

PictureModule.renderPictures(photos);

console.log(photos);
