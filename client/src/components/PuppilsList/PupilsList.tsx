import { IChildren } from '../../reducers/userReducer';
import { useAppSelector } from '../../store/hooks';
import PupilItem from '../PupilItem/PupilItem';

const PupilsList = () => {
  const childrens = useAppSelector((state) => state.classInfo.classInfo.childrens);

  return (
    <div className="pupilsList__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {childrens
            ? childrens.map((pupil: IChildren, ind: number) => {
                return (
                  <PupilItem
                    key={ind}
                    num={ind}
                    id={pupil.id}
                    fullName={pupil.fullName}
                    birthday={pupil.birthday}
                    adress={pupil.adress}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default PupilsList;
