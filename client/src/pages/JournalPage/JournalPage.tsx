import { useEffect, useState } from 'react';
import HomeWorkInJournal from '../../components/HomeWorkInJournal/HomeWorkInJournal';
import PupilsInJornal from '../../components/PupilsInJournal/PupilsInJornal';
import { setActiveQuarter } from '../../reducers/quarterReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchedule } from '../../thunks/schedule';
import { getSubject } from '../../thunks/subject';

const JournalPage = () => {
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((state) => state.schedule.lessonInClass);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeQuarter, setActiveQuarterTab] = useState(2);

  const tabsListLesson = lessons.map((les) => {
    return { title: `${les}` };
  });

  const tabListQuarter = [
    { title: 'I четверть' },
    { title: 'II четверть' },
    { title: 'III четверть' },
    { title: 'IV четверть' },
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
    dispatch(setActiveQuarter(activeTab));
  };

  useEffect(() => {
    if (idClass && lessons[activeLesson]) {
      const nameLesson = lessons[activeLesson];
      dispatch(getSubject({ nameLesson, activeQuarter, idClass }));
    }
  }, [activeLesson, activeQuarter, dispatch, idClass, lessons]);

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  return (
    <>
      <div className="tab">
        {tabListQuarter.map((tab, i) => (
          <button
            className={`tablinks ${i === activeQuarter ? 'active' : ''}`}
            onClick={openTabQuarter}
            data-index={i}
            key={i}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab">
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
      <HomeWorkInJournal />
    </>
  );
};

export default JournalPage;
