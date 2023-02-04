import { useNavigate } from 'react-router-dom';
import { IChildren } from '../../reducers/userReducer';
import moment from 'moment';
import './pupilItem.css';

type IPropsPupil = {
  pupil: IChildren;
  num: number;
};

const PupilItem = ({ pupil, num }: IPropsPupil) => {
  const navigate = useNavigate();
  const { id, firstName, lastName, birthday, adress } = pupil;

  return (
    <tr className={id % 2 ? 'tr__honest' : 'tr__odd'}>
      <td className="pupil__item_id">{num + 1}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/children/${id}`)}>
        {lastName} {firstName}
      </td>
      <td className="pupil__item_birht">{moment(birthday).utc().format('YYYY-MM-DD')}</td>
      <td className="pupil__item_adress">{adress}</td>
    </tr>
  );
};

export default PupilItem;
