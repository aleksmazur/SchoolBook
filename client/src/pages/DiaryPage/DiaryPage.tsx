import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDay from '../../components/DiaryDay/DiaryDay';
import { getMonth } from '../../helpers/dataHelper';
import { setWeek } from '../../reducers/diaryReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDiary } from '../../thunks/diary';

import './diary.css';

const DiaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const startWeek = useAppSelector((state) => state.schedule.startWeek);
  const endWeek = useAppSelector((state) => state.schedule.endWeek);
  const { diary } = useAppSelector((state) => state.diary);
  const { week } = useAppSelector((state) => state.diary);
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
    //id ученика, id класса, номер недели, год
    if (children && idClass) {
      const idPupil = children[0].id;
      const year = 2023;
      dispatch(getDiary({ idPupil, idClass, week, year }));
    }
  }, [dispatch, week, children, idClass]);

  /* const onChangeWeekNext = () => {
    dispatch(setStartWeek(startWeek + 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek + 24 * 60 * 60 * 1000 * 7));
  };

  const onChangeWeekPrev = () => {
    dispatch(setStartWeek(startWeek - 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek - 24 * 60 * 60 * 1000 * 7));
  }; */

  return (
    <div>
      <h2>{t('diary.diaryTitle')}</h2>
      <div className="week__control">
        <div /* onClick={() => onChangeWeekPrev()}  */ className="arrow">&#8592;</div>
        <div>
          {new Date(startWeek).getDate()}, {getMonth(new Date(startWeek).getMonth())}{' '}
          {new Date(startWeek).getFullYear()}
          {' - '}
          {new Date(endWeek).getDate()}, {getMonth(new Date(endWeek).getMonth())}{' '}
          {new Date(endWeek).getFullYear()}
        </div>
        <div /* onClick={() => onChangeWeekNext()} */ className="arrow">&#8594;</div>
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
