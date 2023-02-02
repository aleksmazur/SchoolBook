import { useNavigate } from 'react-router-dom';
import { IPupil } from '../../pages/ClassPage/ClassPage';
import './pupilItem.css';

const PupilItem = ({ name, id, birth, address }: IPupil) => {
  const navigate = useNavigate();

  const pupilId: number = +id.split('_')[1];

  return (
    <tr className={pupilId % 2 ? 'tr__honest' : 'tr__odd'}>
      <td className="pupil__item_id">{pupilId}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/children/${pupilId}`)}>
        {name}
      </td>
      <td className="pupil__item_birht">{birth}</td>
      <td className="pupil__item_adress">{address}</td>
    </tr>
  );
};

export default PupilItem;
