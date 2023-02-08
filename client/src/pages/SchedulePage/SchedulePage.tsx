import { useTranslation } from 'react-i18next';
import ScheduleDay from '../../components/ScheduleDay/ScheduleDay';
import { schedule } from '../DiaryPage/DiaryPage';
import './schedule.css';

const renderShedule = () => {
  return (
    <div className="schedule__list">
      {Object.keys(schedule).map((day, index) => {
        return (
          <ScheduleDay lessons={schedule[day]} day={day} key={index} index={index}></ScheduleDay>
        );
      })}
    </div>
  );
};

const SchedulePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('schedule.scheduleTitle')}</h2>
      {renderShedule()}
    </div>
  );
};

export default SchedulePage;
