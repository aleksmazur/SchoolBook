import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HomeWorkInJournal from '../../components/HomeWorkInJournal/HomeWorkInJournal';
import PupilsInJornal from '../../components/PupilsInJournal/PupilsInJornal';
import { setActiveQuarter } from '../../reducers/quarterReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchedule } from '../../thunks/schedule';
import { getSubject } from '../../thunks/subject';
import './journalPage.css';

const JournalPage = () => {
  const { t } = useTranslation();
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((state) => state.schedule.lessonInClass);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeQuarterTab, setActiveQuarterTab] = useState(2);
  const [openHomework, setOpenHomework] = useState(false);

  const tabsListLesson = lessons.map((les) => {
    return { title: `${les}` };
  });

  const tabListQuarter = [
    { title: `I ${t('journal.quarter')}` },
    { title: `II ${t('journal.quarter')}` },
    { title: `III ${t('journal.quarter')}` },
    { title: `IV ${t('journal.quarter')}` },
  ];

  const openTabLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActiveLesson(activeTab);
  };

  const openTabQuarter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActiveQuarterTab(activeTab);
    dispatch(setActiveQuarter(activeTab + 1));
  };

  useEffect(() => {
    if (idClass && lessons[activeLesson]) {
      const nameLesson = lessons[activeLesson];
      const activeQuarter = activeQuarterTab + 1;
      dispatch(getSubject({ nameLesson, activeQuarter, idClass }));
    }
  }, [activeLesson, activeQuarterTab, dispatch, idClass, lessons]);

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  const toggleHomework = () => {
    setOpenHomework(!openHomework);
  };

  return (
    <>
      <h2>{t('journal.journalTitle')}</h2>
      <div className="tab">
        {tabListQuarter.map((tab, i) => (
          <button
            className={`tablinks ${i === activeQuarterTab ? 'active' : ''}`}
            onClick={openTabQuarter}
            data-index={i}
            key={i}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab subjects-tab">
        {tabsListLesson.map((tab, i) => (
          <button
            className={`tablinks ${i === activeLesson ? 'active' : ''}`}
            onClick={openTabLesson}
            data-index={i}
            key={i}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <PupilsInJornal />
      <button className={openHomework ? 'btn btn-active' : 'btn'} onClick={toggleHomework}>
        {openHomework ? t('journal.hideHomework') : t('journal.showHomework')}
        <div
          className={openHomework ? 'homework__less-button-img' : 'homework__more-button-img'}
        ></div>
      </button>
      {openHomework && <HomeWorkInJournal />}
    </>
  );
};

export default JournalPage;
