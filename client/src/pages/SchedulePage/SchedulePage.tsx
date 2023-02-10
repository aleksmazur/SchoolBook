import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScheduleDay from '../../components/ScheduleDay/ScheduleDay';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchedule } from '../../thunks/schedule';
import './schedule.css';

const SchedulePage = () => {
  const { t } = useTranslation();
  const schedule = useAppSelector((state) => state.schedule.schedule);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  return (
    <div>
      <h2>{t('schedule.scheduleTitle')}</h2>
      {schedule &&
        Object.keys(schedule).map((day, index) => {
          return (
            <ScheduleDay lessons={schedule[day]} day={day} key={index} index={index}></ScheduleDay>
          );
        })}
    </div>
  );
};

export default SchedulePage;
