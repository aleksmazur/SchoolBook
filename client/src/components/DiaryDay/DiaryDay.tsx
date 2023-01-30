import { getWeekDay } from '../../helpers/dataHelper';
import { IScheduleDay } from '../../interfaces/IShedule';
import { useAppSelector } from '../../store/hooks';

const DiaryDay = ({ lessons, index }: IScheduleDay) => {
  const startDayToWeek = useAppSelector((state) => state.schedule.startWeek);
  return (
    <div className="diary__item">
      <table>
        <thead>
          <tr>
            <th className="lesson">
              {getWeekDay(new Date(startDayToWeek + index * 24 * 60 * 60 * 1000).getDay())},
              {new Date(startDayToWeek + index * 24 * 60 * 60 * 1000).getDate()}
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
                  {ind + 1}. {lesson}
                </td>
                <td className="homework"></td>
                <td className="grade"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiaryDay;
