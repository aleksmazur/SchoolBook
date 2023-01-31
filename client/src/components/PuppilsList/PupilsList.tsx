import { IClass, IPupil } from '../../pages/ClassPage/ClassPage';
import PupilItem from '../PupilItem/PupilItem';

const PupilsList = ({ pupils }: IClass) => {
  return (
    <div className="pupilsList__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Адресс</th>
          </tr>
        </thead>
        <tbody>
          {pupils.map((pupil: IPupil, ind: number) => {
            return <PupilItem {...pupil} key={ind} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PupilsList;
