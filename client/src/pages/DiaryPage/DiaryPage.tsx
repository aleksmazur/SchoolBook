/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDay from '../../components/DiaryDay/DiaryDay';
import Preloader from '../../components/Preloader/Preloader';
import { MAX_WEEK_IN_YEAR } from '../../constants/week';
import { getMonth, getWeekNumber } from '../../helpers/dataHelper';
import { setWeek, setYear } from '../../reducers/diaryReducer';
import { setActiveQuarter, setCurrentQuarter } from '../../reducers/quarterReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDiary } from '../../thunks/diary';
import { getQuarter } from '../../thunks/quarter';
import { getSchedule } from '../../thunks/schedule';

import './diary.css';

const lastWeekBeforeHolidays = [44, 52, 12, 21];
const firstWeekAfterHolidays = [35, 46, 14, 2];

const DiaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { diary, week, year, errorDiary, startWeek, endWeek, isLoader } = useAppSelector(
    (state) => state.diary
  );
  const { children, role } = useAppSelector((state) => state.userInfo.userInfo);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const { quarter, activeQuarter, currentQuarter } = useAppSelector((state) => state.quarter);
  const [activeTab, setActiveTab] = useState(activeQuarter);
  const [hiddenPrev, setHiddenPrev] = useState(false);
  const [hiddenNext, setHiddenNext] = useState(false);

  const tabsList = [
    { title: `I ${t('diary.quarter')}` },
    { title: `II ${t('diary.quarter')}` },
    { title: `III ${t('diary.quarter')}` },
    { title: `IV ${t('diary.quarter')}` },
  ];

  useEffect(() => {
    setVisibleArrow(week);
  }, [week]);

  const setVisibleArrow = (week: number) => {
    lastWeekBeforeHolidays.includes(week) ? setHiddenNext(true) : setHiddenNext(false);
    firstWeekAfterHolidays.includes(week) ? setHiddenPrev(true) : setHiddenPrev(false);
  };

  const setQuaterTab = (activeTab: number) => {
    let date = new Date();
    let currentWeek: number = getWeekNumber(date);

    const current = quarter.filter((item) => item.quarter === activeTab)[0];
    if (activeTab === currentQuarter) {
      date = new Date();
    } else if (activeTab > currentQuarter) {
      date = new Date(current.startDate);
    } else if (activeTab < currentQuarter) {
      date = new Date(current.endDate);
    }
    currentWeek = getWeekNumber(date);
    dispatch(setWeek(currentWeek));
    dispatch(setYear(date.getFullYear()));
    dispatch(setActiveQuarter(activeTab));
    setActiveTab(activeTab);
    setVisibleArrow(currentWeek);
  };

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setQuaterTab(activeTab);
  };

  useEffect(() => {
    const today = new Date().getTime();
    quarter.forEach((item) => {
      const startDate = new Date(item.startDate).getTime();
      const endDate = new Date(item.endDate).getTime();
      if (today > startDate && today < endDate) {
        dispatch(setCurrentQuarter(item.quarter));
      }
    });
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
    dispatch(getQuarter());
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

  const subscribeDiary = () => {
    console.log('Дневник подписан!');
  };

  return (
    <div>
      <h2>{t('diary.diaryTitle')}</h2>
      <div className="tab">
        {tabsList.map((tab, i) => (
          <button
            className={`tablinks ${i === activeTab - 1 ? 'active' : ''}`}
            onClick={openTab}
            data-index={i + 1}
            key={i}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {isLoader ? (
        <Preloader />
      ) : (
        <>
          <div className="week__control">
            <div
              onClick={() => onChangeWeekPrev()}
              className={`arrow ${hiddenPrev ? 'hidden' : ''}`}
            >
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
            <div
              onClick={() => onChangeWeekNext()}
              className={`arrow ${hiddenNext ? 'hidden' : ''}`}
            >
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
          {role === 'parent' && (
            <button className="diary__action-button btn" onClick={subscribeDiary}>
              {t('diary.subscribe')}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DiaryPage;
