import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './pupilItem.css';

type IPropsPupil = {
  num: number;
  id: number;
  fullName: string;
  birthday?: string;
  adress?: string;
};

const PupilItem = ({ num, id, fullName, birthday, adress }: IPropsPupil) => {
  const navigate = useNavigate();

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
    </tr>
  );
};

export default PupilItem;
