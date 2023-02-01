import { timeSlots } from '../../constants/timeSlots';
import { getWeekDay } from '../../helpers/dataHelper';
import { IScheduleDay } from '../../interfaces/IShedule';
import { useAppSelector } from '../../store/hooks';
import Lesson from '../Lesson/Lesson';
import './lesson.css';

const ScheduleDay = ({ lessons, index }: IScheduleDay) => {
  const startDayToWeek = useAppSelector((state) => state.schedule.startWeek);

  return (
    <div className="schedule__item">
      <p>{getWeekDay(new Date(startDayToWeek + index * 24 * 60 * 60 * 1000).getDay())}</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Время</th>
            <th>Урок</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, ind: number) => {
            return (
              <tr className={ind % 2 ? 'lesson__odd' : 'lesson__honest'} key={ind}>
                <td className="num">{ind + 1}.</td>
                <td className="time">
                  {timeSlots[ind]['start']} – {timeSlots[ind]['end']}
                </td>
                <Lesson lesson={lesson} key={`${lesson}_${ind}`} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleDay;
