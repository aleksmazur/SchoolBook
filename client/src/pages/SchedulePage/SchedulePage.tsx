import ScheduleDay from '../../components/ScheduleDay/ScheduleDay';
import { setEndWeek, setStartWeek } from '../../reducers/scheduleReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './schedule.css';
export const weekDayArray = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
export const getWeekDay = (dayId: number) => {
  return weekDayArray[dayId];
};

export const monthArray = [
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

export const getMonth = (monthId: number) => monthArray[monthId];

const schedule = [
  ['математика', 'русский', 'труд'],
  ['литература', 'белорусский', 'физкультура'],
  ['литература', 'математика', 'физкультура'],
  ['литература', 'изо', 'физкультура'],
  ['литература', 'труд', 'физкультура'],
  [],
];

const SchedulePage = () => {
  const dispatch = useAppDispatch();
  const startWeek = useAppSelector((state) => state.schedule.startWeek);
  const endWeek = useAppSelector((state) => state.schedule.endWeek);

  const onChangeWeekNext = () => {
    dispatch(setStartWeek(startWeek + 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek + 24 * 60 * 60 * 1000 * 7));
  };

  const onChangeWeekPrev = () => {
    dispatch(setStartWeek(startWeek - 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek - 24 * 60 * 60 * 1000 * 7));
  };

  const renderShedule = () => {
    return (
      <div className="schedule__list">
        {schedule.map((lessons, index) => {
          return <ScheduleDay lessons={lessons} key={index} index={index}></ScheduleDay>;
        })}
      </div>
    );
  };

  return (
    <div>
      <p>Schedule</p>
      <div>
        Старт недели {new Date(startWeek).getDate()}, {getMonth(new Date(startWeek).getMonth())},
        {new Date(startWeek).getFullYear()}
      </div>
      <div>
        Конец недели {new Date(endWeek).getDate()}, {getMonth(new Date(endWeek).getMonth())},
        {new Date(endWeek).getFullYear()}
      </div>
      <div onClick={() => onChangeWeekPrev()}>предыдущая</div>
      <div onClick={() => onChangeWeekNext()}>следующая</div>
      <div>{renderShedule()}</div>
    </div>
  );
};

export default SchedulePage;
