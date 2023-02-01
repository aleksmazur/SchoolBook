import ScheduleDay from '../../components/ScheduleDay/ScheduleDay';
import { schedule } from '../DiaryPage/DiaryPage';
import './schedule.css';

const renderShedule = () => {
  return (
    <div className="schedule__list">
      {schedule.map((lessons, index) => {
        return <ScheduleDay lessons={lessons} key={index} index={index}></ScheduleDay>;
      })}
    </div>
  );
};

const SchedulePage = () => {
  return (
    <div>
      <h3>Расписание</h3>
      {renderShedule()}
    </div>
  );
};

export default SchedulePage;
