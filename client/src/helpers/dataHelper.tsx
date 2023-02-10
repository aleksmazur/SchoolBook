const weekDayArray = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
const monthArray = [
  'Январь',
  'Феврaль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const getWeekDay = (dayId: number) => {
  return weekDayArray[dayId];
};

export const getMonth = (monthId: number) => monthArray[monthId];

export const getWeekNumber = () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate.getTime() - startDate.getTime()) / 86400000 + 1);
  return Math.ceil(days / 7);
};
