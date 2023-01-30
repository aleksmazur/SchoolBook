import { getWeekDay } from '../../helpers/dataHelper';
import { useAppSelector } from '../../store/hooks';
import Lesson from '../Lesson/Lesson';

type IScheduleDay = {
  lessons: string[];
  index: number;
};

const ScheduleDay = ({ lessons, index }: IScheduleDay) => {
  const startDayToWeek = useAppSelector((state) => state.schedule.startWeek);

  return (
    <div className="schedule__item db__day">
      <table>
        <thead>
          <tr>
            <th className="lesson">
              {getWeekDay(new Date(startDayToWeek + index * 24 * 60 * 60 * 1000).getDay())},
              {new Date(startDayToWeek + index * 24 * 60 * 60 * 1000).getDate()}
              {lessons.map((lesson: string, ind: number) => {
                return <Lesson lesson={lesson} key={ind} />;
              })}
            </th>
            <th className="ht">Домашнее задание</th>
            <th className="mark">Отметка</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ScheduleDay;
