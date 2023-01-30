import DiaryDay from '../../components/DiaryDay/DiaryDay';
import PupilsList from '../../components/PuppilsList/PupilsList';
import PupilList from '../../components/PuppilsList/PupilsList';
import { getMonth } from '../../helpers/dataHelper';
import { setEndWeek, setStartWeek } from '../../reducers/scheduleReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export type IPupil = {
  id: string;
  name: string;
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
    { id: '1a_1', name: 'Агатьева Арина Юрьевна' },
    { id: '1a_2', name: 'Алексеева Пальмира Гурьевна' },
    { id: '1a_3', name: 'Алексеев Феликс Александрович' },
    { id: '1a_4', name: 'Борисова Екатерина Юрьевна' },
    { id: '1a_5', name: 'Васильев Иван Юрьевич' },
    { id: '1a_6', name: 'Григорьева Елена Андреевна' },
    { id: '1a_7', name: 'Данилов Александр Леонидович' },
    { id: '1a_8', name: 'Жидова Анастасия Анатольевна' },
    { id: '1a_9', name: 'Исаков Константин Сергеевич' },
    { id: '1a_10', name: 'Иванов Иван Александрович' },
    { id: '1a_11', name: 'Клементьева Екатерина Николаевна' },
    { id: '1a_12', name: 'Николаева Анжелика Леонидовна' },
    { id: '1a_13', name: 'Николаева Анна Игоревна' },
    { id: '1a_14', name: 'Николаев Кирилл Андреевич' },
    { id: '1a_15', name: 'Родионова Елена Васильевна' },
    { id: '1a_16', name: 'Семёнова Анна Александровна' },
    { id: '1a_17', name: 'Терентьев Юрий Александрович' },
    { id: '1a_18', name: 'Фёдоров Владимир Николаевич' },
  ],
};

const ClassPage = () => {
  const dispatch = useAppDispatch();
  const startWeek = useAppSelector((state) => state.schedule.startWeek);
  const endWeek = useAppSelector((state) => state.schedule.endWeek);

  return (
    <div>
      <h3>{classData.name}</h3>
      <div>
        <p>Наш класс</p>
        <PupilsList {...classData} />
      </div>
    </div>
  );
};

export default ClassPage;
