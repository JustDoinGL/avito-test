export const formatLength = (length: number) => {
  const hoursArr = ['час', 'часа', 'часов'];
  const minutesArr = ['минута', 'минуты', 'минут'];

  const hours = Math.floor(length / 60);
  const minutes = length % 60;

  const hoursText = hoursArr[(hours % 100 > 4 && hours % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(hours % 10 < 5) ? hours % 10 : 5]];
  const minutesText = minutesArr[(minutes % 100 > 4 && minutes % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(minutes % 10 < 5) ? minutes % 10 : 5]];

  return `${hours} ${hoursText} ${minutes} ${minutesText}`;
}