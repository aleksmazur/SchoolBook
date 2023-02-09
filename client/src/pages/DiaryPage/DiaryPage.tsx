import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDay from '../../components/DiaryDay/DiaryDay';
import { MAX_WEEK_IN_YEAR } from '../../constants/week';
import { getMonth } from '../../helpers/dataHelper';
import { setWeek, setYear } from '../../reducers/diaryReducer';
import { setEndWeek, setStartWeek } from '../../reducers/scheduleReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDiary } from '../../thunks/diary';

import './diary.css';

const DiaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { startWeek, endWeek } = useAppSelector((state) => state.schedule);
  const { diary, week, year } = useAppSelector((state) => state.diary);
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);

  const getWeekNumber = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate.getTime() - startDate.getTime()) / 86400000 + 1);
    return Math.ceil(days / 7);
  };

  useEffect(() => {
    dispatch(setWeek(getWeekNumber()));
  }, [dispatch]);

  useEffect(() => {
    if (children && idClass) {
      const idPupil = children[0].id;
      dispatch(getDiary({ idPupil, idClass, week, year }));
    }
  }, [dispatch, week, children, idClass, year]);

  const onChangeWeekNext = () => {
    dispatch(setStartWeek(startWeek + 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek + 24 * 60 * 60 * 1000 * 7));
    if (week + 1 > MAX_WEEK_IN_YEAR) {
      dispatch(setWeek(0));
      dispatch(setYear(year + 1));
    } else {
      dispatch(setWeek(week + 1));
    }
  };

  const onChangeWeekPrev = () => {
    dispatch(setStartWeek(startWeek - 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek - 24 * 60 * 60 * 1000 * 7));
    if (week - 1 < 0) {
      dispatch(setWeek(MAX_WEEK_IN_YEAR));
      dispatch(setYear(year - 1));
    } else {
      dispatch(setWeek(week - 1));
    }
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

      <div className="diary__list">
        {diary &&
          Object.keys(diary).map((date, index) => (
            <DiaryDay lessons={diary[date]} index={index} key={index} date={date}></DiaryDay>
          ))}
      </div>
    </div>
  );
};

export default DiaryPage;
