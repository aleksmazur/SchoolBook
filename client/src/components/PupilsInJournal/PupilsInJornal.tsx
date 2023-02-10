import { IChildren } from '../../reducers/userReducer';
import { useAppSelector } from '../../store/hooks';
import PupilItem from '../PupilItem/PupilItem';

const PupilsInJornal = () => {
  const childrens = useAppSelector((state) => state.classInfo.classInfo.childrens);

  return (
    <div className="pupilsList__table">
      <table>
        <thead>
          <tr>
            <th>Даты</th>
            <th>ФИО</th>
            <th>21.02</th>
            <th>21.02</th>
            <th>21.02</th>
            <th>21.02</th>
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
                    diary={true}
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
