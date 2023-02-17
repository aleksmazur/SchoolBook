import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputGrade } from '../InputGrade/InputGrade';
import { useAppSelector } from '../../store/hooks';

type IPropsPupil = {
  num: number;
  id: number;
  fullName: string;
};

const PupilItemInJournal = ({ num, id, fullName }: IPropsPupil) => {
  const navigate = useNavigate();
  const [isInput, setIsInput] = useState(false);
  const subjects = useAppSelector((state) => state.subjects.subjects);

  return (
    <tr>
      <td className="pupil__item_id">{num + 1}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/class/children/${id}`)}>
        <Link to={`/class/children/${id}`}>{fullName}</Link>
      </td>
      {isInput ? (
        <td className="cell__grade-active">
          {subjects && (
            <InputGrade setIsInput={setIsInput} idPupil={id} idLesson={subjects[num].id} />
          )}
        </td>
      ) : (
        <td className="cell__grade" onClick={() => setIsInput(true)} data-idpupil={id}>
          <span>
            {subjects && subjects[num] && subjects[num].grades && subjects[num].grades[0]
              ? subjects[num].grades[0].value
              : ''}
          </span>
          <div></div>
        </td>
      )}
    </tr>
  );
};

export default PupilItemInJournal;
