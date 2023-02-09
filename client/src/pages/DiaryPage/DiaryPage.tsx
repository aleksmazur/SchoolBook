import { useTranslation } from 'react-i18next';
import DiaryDay from '../../components/DiaryDay/DiaryDay';
import { getMonth } from '../../helpers/dataHelper';
import { IShedule } from '../../interfaces/IShedule';
import { setEndWeek, setStartWeek } from '../../reducers/scheduleReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './diary.css';

export const schedule: IShedule = {
  среда: [
    {
      id: 1,
      date: '2023-02-08T05:45:00.000Z',
      name: 'Математика',
      startTime: '08:45',
      endTime: '09:30',
      classId: 5,
    },
    {
      id: 2,
      name: 'Русский язык',
      date: '2023-02-08T06:45:00.000Z',
      startTime: '09:45',
      endTime: '10:30',
      classId: 5,
    },
    {
      id: 3,
      name: 'Труд',
      date: '2023-02-08T07:45:00.000Z',
      startTime: '10:45',
      endTime: '11:30',
      classId: 5,
    },
  ],
  четверг: [
    {
      id: 4,
      name: 'Физкультура',
      date: '2023-02-09T05:30:00.000Z',
      startTime: '08:30',
      endTime: '09:15',
      classId: 5,
    },
    {
      id: 5,
      name: 'Литература',
      date: '2023-02-09T06:30:00.000Z',
      startTime: '09:30',
      endTime: '10:15',
      classId: 5,
    },
  ],
};

const DiaryPage = () => {
  const { t } = useTranslation();

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
      <div className="diary__list">
        {Object.keys(schedule).map((day, index) => {
          return (
            <DiaryDay lessons={schedule[day]} key={index} index={index} dayWeek={day}></DiaryDay>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h2>{t('diary.diaryTitle')}</h2>
      <div className="week__control">
        <div onClick={() => onChangeWeekPrev()} className="arrow">
          &#8592;
        </div>
        <div>
          {new Date(startWeek).getDate()}, {getMonth(new Date(startWeek).getMonth())}{' '}
          {new Date(startWeek).getFullYear()}
          {' - '}
          {new Date(endWeek).getDate()}, {getMonth(new Date(endWeek).getMonth())}{' '}
          {new Date(endWeek).getFullYear()}
        </div>
        <div onClick={() => onChangeWeekNext()} className="arrow">
          &#8594;
        </div>
      </div>
      <div>{renderShedule()}</div>
    </div>
  );
};

export default DiaryPage;
