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

export const getWeekNumber = (today: Date) => {
  // const currentDate = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today.getTime() - startDate.getTime()) / 86400000 + 1);
  return Math.ceil(days / 7);
};
