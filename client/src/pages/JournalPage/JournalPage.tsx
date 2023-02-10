import { useEffect, useState } from 'react';
import PupilsList from '../../components/PuppilsList/PupilsList';
import TabContent from '../../components/Tabs/Tabs';
import { ISсhedule } from '../../interfaces/ISchedule';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSchedule } from '../../thunks/schedule';

const JournalPage = () => {
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((state) => state.schedule.lessonInClass);
  const pupils = useAppSelector((state) => state.classInfo.classInfo.childrens);
  const [active, setActive] = useState(0);

  const tabsList = lessons.map((les) => {
    return { title: `${les}` };
  });

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

  useEffect(() => {
    if (idClass) {
      dispatch(getSchedule(idClass));
    }
  }, [idClass, dispatch]);

  return (
    <>
      <div className="tab">
        {tabsList.map((tab, i) => (
          <button
            className={`tablinks ${i === active ? 'active' : ''}`}
            onClick={openTab}
            data-index={i}
            key={i}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabsList[active] && <TabContent {...tabsList[active]} />}
      <PupilsList />
    </>
  );
};

export default JournalPage;
