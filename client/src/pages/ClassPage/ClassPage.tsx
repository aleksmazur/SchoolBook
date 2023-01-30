import { useState } from 'react';
import PupilsList from '../../components/PuppilsList/PupilsList';
import TabContent from '../../components/Tabs/Tabs';

export type IPupil = {
  id: string;
  name: string;
  birth: string;
  address: string;
};

export type IClass = {
  id: string;
  name: string;
  pupils: IPupil[];
};

const classData: IClass = {
  id: '1a',
  name: '1A',
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

const tabsList = [
  { title: 'Список класса', content: <PupilsList {...classData} /> },
  { title: 'Фото класса', content: 'Photo' },
  { title: 'Наш учитель', content: 'TeacherInfo или редирект на страницу учителя' },
];

export type ITabsList = {
  title: string;
  content: JSX.Element | string;
};

const ClassPage = () => {
  const [active, setActive] = useState<number>(0);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTab = e.target as HTMLButtonElement;
    const activeTab = Number(currentTab.dataset.index);
    setActive(activeTab);
  };

  return (
    <div>
      <h3>{classData.name}</h3>
      <div>
        {/* <PupilsList {...classData} /> */}
        <div>
          <div className="tab">
            {tabsList.map((n, i) => (
              <button
                className={`tablinks ${i === active ? 'active' : ''}`}
                onClick={openTab}
                data-index={i}
                key={i}
              >
                {n.title}
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
