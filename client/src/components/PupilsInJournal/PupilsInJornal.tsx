import { IChildren } from '../../reducers/userReducer';
import { useAppSelector } from '../../store/hooks';
import { IHomeWork } from '../HomeWorkInJournal/HomeWorkInJournal';
import PupilItemInJournal from '../PupilItemInJournal/PupilteminJournal';

export const getDate = (date: string): string => {
  const day =
    new Date(date.substring(0, 10)).getDate().toString().length < 2
      ? `0${new Date(date.substring(0, 10)).getDate().toString()}`
      : new Date(date.substring(0, 10)).getDate().toString();
  const month =
    (new Date(date.substring(0, 10)).getMonth() + 1).toString().length < 2
      ? `0${(new Date(date.substring(0, 10)).getMonth() + 1).toString()}`
      : (new Date(date.substring(0, 10)).getMonth() + 1).toString();
  return `${day}.${month}`;
};

const PupilsInJornal = ({ filtersSubject }: IHomeWork) => {
  const childrens = useAppSelector((state) => state.classInfo.classInfo.childrens);
  //название предмета, четверть, id класса + сортировка по дате

  return (
    <div className="pupilsList__table">
      <table>
        <thead>
          <tr>
            <th>Даты</th>
            <th>ФИО</th>
            {filtersSubject.map((sub, ind) => (
              <th key={ind} data-idlesson={sub.id}>
                {getDate(sub.date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {childrens
            ? childrens.map((pupil: IChildren, ind: number) => {
                return (
                  <PupilItemInJournal
                    key={ind}
                    num={ind}
                    id={pupil.id}
                    fullName={pupil.fullName}
                    filtersSubject={filtersSubject}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default PupilsInJornal;
