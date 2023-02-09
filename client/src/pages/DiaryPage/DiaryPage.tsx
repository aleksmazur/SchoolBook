import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDay from '../../components/DiaryDay/DiaryDay';
import Preloader from '../../components/Preloader/Preloader';
import { MAX_WEEK_IN_YEAR } from '../../constants/week';
import { getMonth } from '../../helpers/dataHelper';
import { setWeek, setYear } from '../../reducers/diaryReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDiary } from '../../thunks/diary';
import { getSchedule } from '../../thunks/schedule';

import './diary.css';

const DiaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { diary, week, year, errorDiary, startWeek, endWeek, isLoader } = useAppSelector(
    (state) => state.diary
  );
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  useEffect(() => {
    if (children && idClass) {
      const idPupil = children[0].id;
      dispatch(getDiary({ idPupil, idClass, week, year }));
    }
  }, [dispatch, week, children, idClass, year]);

  const onChangeWeekNext = () => {
    if (week + 1 > MAX_WEEK_IN_YEAR) {
      dispatch(setWeek(0));
      dispatch(setYear(year + 1));
    } else {
      dispatch(setWeek(week + 1));
    }
  };

  const onChangeWeekPrev = () => {
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
      {isLoader ? (
        <Preloader />
      ) : (
        <>
          <div className="week__control">
            <div onClick={() => onChangeWeekPrev()} className="arrow">
              &#8592;
            </div>
            {startWeek && endWeek && !errorDiary && (
              <div>
                {new Date(startWeek).getDate()}, {getMonth(new Date(startWeek).getMonth())}{' '}
                {new Date(startWeek).getFullYear()}
                {' - '}
                {new Date(endWeek).getDate()}, {getMonth(new Date(endWeek).getMonth())}{' '}
                {new Date(endWeek).getFullYear()}
              </div>
            )}
            <div onClick={() => onChangeWeekNext()} className="arrow">
              &#8594;
            </div>
          </div>

          {!errorDiary ? (
            <div className="diary__list">
              {diary &&
                Object.keys(diary).map((date, index) => (
                  <DiaryDay lessons={diary[date]} index={index} key={index} date={date}></DiaryDay>
                ))}
            </div>
          ) : (
            <div className="error__text">{errorDiary}</div>
          )}
        </>
      )}
    </div>
  );
};

export default DiaryPage;
