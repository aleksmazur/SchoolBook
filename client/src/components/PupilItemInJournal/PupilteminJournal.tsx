import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputGrade } from '../InputGrade/InputGrade';
import { ISubjects } from '../../reducers/subjectsReducer';

type IPropsPupil = {
  num: number;
  id: number;
  fullName: string;
  filtersSubject: ISubjects[];
};

const PupilItemInJournal = ({ num, id, fullName }: IPropsPupil) => {
  const navigate = useNavigate();
  const [isInput, setIsInput] = useState(false);

  return (
    <tr>
      <td className="pupil__item_id">{num + 1}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/class/children/${id}`)}>
        <Link to={`/class/children/${id}`}>{fullName}</Link>
      </td>
      {isInput ? (
        <td className="cell__grade-active">
          <InputGrade setIsInput={setIsInput} idPupil={id} />
        </td>
      ) : (
        <td className="cell__grade" onClick={() => setIsInput(true)} data-idpupil={id}>
          <span>4</span>
          <div></div>
        </td>
      )}
    </tr>
  );
};

export default PupilItemInJournal;
