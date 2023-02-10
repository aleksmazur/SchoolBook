import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';
import PupilsList from '../../components/PuppilsList/PupilsList';
import { getClassByID } from '../../thunks/classes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import TabContent from '../../components/Tabs/Tabs';
import TeacherItem from '../../components/TeacherItem/TeacherItem';

export type ITabsList = {
  title: string;
  content?: JSX.Element | string;
};

const ClassPage = () => {
  const { t } = useTranslation();
  const { classInfo } = useAppSelector((state) => state.classInfo);

  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { role, children } = userInfo;
  const dispatch = useAppDispatch();

  const tabsList = [
    { title: `${t('class.classList')}`, content: <PupilsList /> },
    { title: `${t('class.classPhotos')}`, content: <PhotoSlider /> },
    {
      title: `${t('class.teacher')}`,
      content: <TeacherItem />,
    },
  ];

  const [active, setActive] = useState(0);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

  useEffect(() => {
    if (role === 'parent') {
      if (children) {
        dispatch(getClassByID(children[0].classId));
      }
    }
  }, [children, role, dispatch]);

  return (
    <div>
      <h2>{classInfo.className}</h2>
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

export default ClassPage;
