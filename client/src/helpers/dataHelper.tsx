const weekDayArray = {
  ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
const monthArray = {
  ru: [
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
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

export const getWeekDay = (dayId: number) => {
  const lang = localStorage.getItem('i18nextLng') as string;
  return lang === 'ru' ? weekDayArray.ru[dayId] : weekDayArray.en[dayId];
};

export const getMonth = (monthId: number) => {
  const lang = localStorage.getItem('i18nextLng') as string;
  return lang === 'ru' ? monthArray.ru[monthId] : monthArray.en[monthId];
};

export const getWeekNumber = (today: Date) => {
  // const currentDate = new Date();
  const startDate = new Date(today.getFullYear(), 0, 0);
  const days = Math.floor((today.getTime() - startDate.getTime()) / 86400000 + 1);
  return Math.ceil(days / 7);
};
