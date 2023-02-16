import { useEffect, useState } from 'react';
import HomeWorkInJournal from '../../components/HomeWorkInJournal/HomeWorkInJournal';
import PupilsInJornal from '../../components/PupilsInJournal/PupilsInJornal';
import { ISubjects } from '../../reducers/subjectsReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchedule } from '../../thunks/schedule';

const JournalPage = () => {
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((state) => state.schedule.lessonInClass);
  const subjects = useAppSelector((state) => state.subjects.subjects);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeQuarter, setActiveQuarter] = useState(2);
  const [filtersSubject, setFiltersSubject] = useState<ISubjects[]>([]);

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
    setActiveQuarter(activeTab);
  };

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  useEffect(() => {
    const res = subjects
      .filter((item) => item.name === lessons[activeLesson])
      .filter((item) => item.quarter.quarter === activeQuarter + 1)
      .filter((item) => item.classId === idClass)
      .sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
    setFiltersSubject(res);
  }, [subjects, activeLesson, activeQuarter, idClass, lessons]);

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

      <PupilsInJornal filtersSubject={filtersSubject} />
      <HomeWorkInJournal filtersSubject={filtersSubject} />
    </>
  );
};

export default JournalPage;
