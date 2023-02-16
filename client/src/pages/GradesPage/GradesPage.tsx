import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TabContent from '../../components/Tabs/Tabs';
import CurrentGrades from '../../components/CurrentGrades/CurrentGrades';
import FinalGrades from '../../components/FinalGrades/FinalGrades';
import { setCurrentQuarter } from '../../reducers/quarterReducer';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getFinalDiary } from '../../thunks/diary';
import { getQuarter } from '../../thunks/quarter';

export type ITabsList = {
  title: string;
  content: JSX.Element | string;
};

const GradesPage = () => {
  const { t } = useTranslation();

  const tabsList = [
    { title: `${t('grades.currentGrades')}`, content: <CurrentGrades /> },
    { title: `${t('grades.finalGrades')}`, content: <FinalGrades /> },
    /*     { title: `${t('grades.rating')}`, content: '*Рейтинг класса*' }, */
  ];

  const [active, setActive] = useState(0);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

  const { quarter } = useAppSelector((state) => state.quarter);
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuarter());
  }, [dispatch]);

  useEffect(() => {
    const today = new Date().getTime();
    quarter.forEach((item) => {
      const startDate = new Date(item.startDate).getTime();
      const endDate = new Date(item.endDate).getTime();
      if (today > startDate && today < endDate) {
        dispatch(setCurrentQuarter(item.quarter));
      }
    });
    if (children && idClass) {
      const idPupil = children[0].id;
      dispatch(getFinalDiary({ idPupil, idClass }));
    }
  }, [dispatch, children, idClass, quarter]);

  return (
    <div>
      <h2>{t('grades.grades')}</h2>
      <div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
