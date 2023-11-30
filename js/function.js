function isMeetingWithinWorkingHours(startWorking, endWorking, startMeeting, duration) {
  const [startWorkingHours, startWorkingMinutes] = startWorking.split(':').map(Number);
  const [endWorkingHours, endWorkingMinutes] = endWorking.split(':').map(Number);
  const [startMeetingHours, startMeetingMinutes] = startMeeting.split(':').map(Number);

  const endMeetingHours = Math.floor(duration / 60);
  const endMeetingMinutes = duration % 60;

  const totalMeetingMinutes = startMeetingHours * 60 + startMeetingMinutes + endMeetingHours * 60 + endMeetingMinutes;
  const endMeetingTimeHours = Math.floor(totalMeetingMinutes / 60);
  const endMeetingTimeMinutes = totalMeetingMinutes % 60;

  if (
    startMeetingHours < startWorkingHours ||
    (startMeetingHours === startWorkingHours && startMeetingMinutes < startWorkingMinutes) ||
    endMeetingTimeHours > endWorkingHours ||
    (endMeetingTimeHours === endWorkingHours && endMeetingTimeMinutes > endWorkingMinutes)
  ) {
    return false;
  }

  return true;
}

function checkStringLength(inputString, maxLength) {
  return inputString.length <= maxLength;
}
// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


function isPalindrome(inputString) {
  // Удаляем пробелы и приводим строку к нижнему регистру
  const cleanedString = inputString.toLowerCase().replace(/\s/g, '');

  // Переворачиваем строку
  const reversedString = cleanedString.split('').reverse().join('');

  // Сравниваем исходную строку с перевернутой
  return cleanedString === reversedString;
}
// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс');  // false
// Это палиндром
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


function extractNumbers(inputString) {
  const digitArray = inputString.match(/\d/g);
  if (!digitArray) {
    return NaN;
  }
  const digitString = digitArray.join('');
  return parseInt(digitString, 10);
}
extractNumbers('2023 год');            // 2023
extractNumbers('ECMAScript 2022');     // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007');           // 7
extractNumbers('а я томат');           // NaN
extractNumbers(2023); // 2023
extractNumbers(-1);   // 1
extractNumbers(1.5);  // 15
