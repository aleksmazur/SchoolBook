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
