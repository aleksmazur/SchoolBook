import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';
import PupilsList from '../../components/PuppilsList/PupilsList';
import TabContent from '../../components/Tabs/Tabs';
import TeacherItem from '../../components/TeacherItem/TeacherItem';

export type IPupil = {
  id: string;
  name: string;
  birth: string;
  address: string;
};

export type IClass = {
  id: string;
  name: string;
  teacherId: string;
  pupils: IPupil[];
};

const classData: IClass = {
  id: '1a',
  name: '1A',
  teacherId: '1a_teacher',
  pupils: [
    {
      id: '1a_1',
      name: 'Агатьева Арина Юрьевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_2',
      name: 'Алексеева Пальмира Гурьевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_3',
      name: 'Алексеев Феликс Александрович',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_4',
      name: 'Борисова Екатерина Юрьевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_5',
      name: 'Васильев Иван Юрьевич',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_6',
      name: 'Григорьева Елена Андреевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_7',
      name: 'Данилов Александр Леонидович',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_8',
      name: 'Жидова Анастасия Анатольевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_9',
      name: 'Исаков Константин Сергеевич',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_10',
      name: 'Иванов Иван Александрович',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_11',
      name: 'Клементьева Екатерина Николаевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_12',
      name: 'Николаева Анжелика Леонидовна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_13',
      name: 'Николаева Анна Игоревна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_14',
      name: 'Николаев Кирилл Андреевич',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_15',
      name: 'Родионова Елена Васильевна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_16',
      name: 'Семёнова Анна Александровна',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_17',
      name: 'Терентьев Юрий Александрович',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
    {
      id: '1a_18',
      name: 'Фёдоров Владимир Николаевич',
      birth: '01.01.2016',
      address: 'ул. Строителей, 25, 12',
    },
  ],
};

export type ITabsList = {
  title: string;
  content: JSX.Element | string;
};

const ClassPage = () => {
  const { t } = useTranslation();

  const tabsList = [
    { title: `${t('class.classList')}`, content: <PupilsList {...classData} /> },
    { title: `${t('class.classPhotos')}`, content: <PhotoSlider /> },
    {
      title: `${t('class.teacher')}`,
      content: <TeacherItem {...classData} />,
    },
  ];

  const [active, setActive] = useState(0);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

  return (
    <div>
      <h2>{classData.name}</h2>
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