//Файл - точка входа
import { generateRandomComment, getRandomInt } from './util.js';
//Возможно лишнее сейчас, тк импорт для createPhotosData написан в data.js
import { createPhotosData } from './data.js';

const photos = createPhotosData();
console.log(photos);
