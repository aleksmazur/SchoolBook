import { IClass, IPupil } from '../../pages/ClassPage/ClassPage';
import { useAppSelector } from '../../store/hooks';
import PupilItem from '../Pupil/Pupil';

const PupilsList = ({ pupils }: IClass) => {
  //   const startDayToWeek = useAppSelector((state) => state.schedule.startWeek);

  console.log(pupils);

  return (
    <div className="pupilsList__container">
      <table>
        <thead>
          <tr>
            <th className="pupilsList">
              {pupils.map((pupil: IPupil, ind: number) => {
                return <PupilItem {...pupil} key={ind} />;
              })}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default PupilsList;
