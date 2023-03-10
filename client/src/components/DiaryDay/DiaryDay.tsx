import { useTranslation } from 'react-i18next';
import { getWeekDay } from '../../helpers/dataHelper';
import { IDiaryDay } from '../../reducers/diaryReducer';
import './diaryDay.css';

type IDiaryProps = {
  lessons: IDiaryDay[];
  date: string;
  index: number;
};

const DiaryDay = ({ lessons, date, index }: IDiaryProps) => {
  const { t } = useTranslation();

  const dayFromDate = new Date(date).getDay();
  const today = new Date(Date.now()).toLocaleDateString('ru-RU').split('.').reverse().join('.');

  return (
    <div
      className={date === today ? 'diary__item current' : 'diary__item'}
      data-day={date}
      data-greed={index}
    >
      <table>
        <thead>
          <tr>
            <th className="lesson">
              {getWeekDay(dayFromDate)}
              <br />
              <span>{date}</span>
            </th>
            <th className="hw">{t('diary.task')}</th>
            <th className="mark">{t('diary.mark')}</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, ind) => {
            return (
              <tr key={`${ind}_${lesson}`}>
                <td className="num">
                  {ind + 1}. {lesson.name}
                </td>
                <td className="homework">{lesson.homework}</td>
                <td className="grade">{lesson.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiaryDay;
