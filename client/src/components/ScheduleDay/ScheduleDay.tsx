import { ISсheduleDay } from '../../interfaces/ISchedule';
import Lesson from '../Lesson/Lesson';
import './lesson.css';

type IScheduleDayProps = {
  lessons: ISсheduleDay[];
  index: number;
  day: string;
};

const ScheduleDay = ({ lessons, index, day }: IScheduleDayProps) => {
  const today = new Date(Date.now()).getDay() - 1;

  return (
    <div>
      <p>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
      <table
        className={index === today ? 'schedule__item current' : 'schedule__item'}
        data-day={index}
      >
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
                  {lesson.startTime} – {lesson.endTime}
                </td>
                <Lesson lesson={lesson.name} key={`${lesson}_${ind}`} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleDay;
