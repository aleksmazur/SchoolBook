import { IPupil } from '../../pages/ClassPage/ClassPage';

const PupilItem = ({ name, id }: IPupil) => {
  return (
    <div>
      <div className="pupil__name">
        <span className="pupil__name">{id.slice(3)}. </span>
        {name}
      </div>
    </div>
  );
};

export default PupilItem;
