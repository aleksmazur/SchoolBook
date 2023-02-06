import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TabContent from '../../components/Tabs/Tabs';
import CurrentGrades from '../../components/CurrentGrades/CurrentGrades';
import FinalGrades from '../../components/FinalGrades/FinalGrades';

export type ITabsList = {
  title: string;
  content: JSX.Element | string;
};

const GradesPage = () => {
  const { t } = useTranslation();

  const tabsList = [
    { title: `${t('grades.currentGrades')}`, content: <CurrentGrades /> },
    { title: `${t('grades.finalGrades')}`, content: <FinalGrades /> },
    { title: `${t('grades.rating')}`, content: '*Рейтинг класса*' },
  ];

  const [active, setActive] = useState(0);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

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
