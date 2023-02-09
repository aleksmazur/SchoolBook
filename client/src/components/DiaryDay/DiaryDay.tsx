import { getWeekDay } from '../../helpers/dataHelper';
import { IDiaryDay } from '../../reducers/diaryReducer';
import './diaryDay.css';

type IDiaryProps = {
  lessons: IDiaryDay[];
  index: number;
  date: string;
};

const DiaryDay = ({ lessons, index, date }: IDiaryProps) => {
  const dayFromDate = new Date(date).getDay();
  const todayDay = new Date(Date.now()).getDay() - 1;

  return (
    <div className={index === todayDay ? 'diary__item current' : 'diary__item'} data-day={index}>
      <table>
        <thead>
          <tr>
            <th className="lesson">
              {getWeekDay(dayFromDate)}
              <br />
              <span>{date}</span>
            </th>
            <th className="hw">Домашнее задание</th>
            <th className="mark">Отметка</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, ind) => {
            return (
              <tr className={ind % 2 ? 'lesson__odd' : 'lesson__honest'} key={`${ind}_${lesson}`}>
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
