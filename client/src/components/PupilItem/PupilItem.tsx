import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { InputGrade } from '../InputGrade/InputGrade';
import './pupilItem.css';

type IPropsPupil = {
  num: number;
  id: number;
  fullName: string;
  birthday?: string;
  adress?: string;
  diary?: boolean;
};

const PupilItem = ({ num, id, fullName, birthday, adress, diary }: IPropsPupil) => {
  const navigate = useNavigate();
  const [isInput, setIsInput] = useState(false);

  return (
    <tr>
      <td className="pupil__item_id">{num + 1}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/class/children/${id}`)}>
        <Link to={`/class/children/${id}`}>{fullName}</Link>
      </td>
      {birthday && (
        <td className="pupil__item_birht">{moment(birthday).utc().format('YYYY-MM-DD')}</td>
      )}
      {adress && <td className="pupil__item_adress">{adress}</td>}
      {isInput ? (
        <td className="cell__grade-active">
          <InputGrade setIsInput={setIsInput} idPupil={id} />
        </td>
      ) : (
        diary && (
          <td className="cell__grade" onClick={() => setIsInput(true)} data-idpupil={id}>
            <span>4</span>
            <div></div>
          </td>
        )
      )}
    </tr>
  );
};

export default PupilItem;
