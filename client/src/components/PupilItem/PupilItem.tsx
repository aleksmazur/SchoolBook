import { useNavigate } from 'react-router-dom';
import { IPupil } from '../../pages/ClassPage/ClassPage';
import './pupilItem.css';

const PupilItem = ({ name, id, birth, address }: IPupil) => {
  const navigate = useNavigate();

  return (
    <tr className={+id.slice(3) % 2 ? 'tr__honest' : 'tr__odd'}>
      <td className="pupil__item_id">{id.slice(3)}. </td>
      <td className="pupil__item_name" onClick={() => navigate(`/pupils/${id}`)}>
        {name}
      </td>
      <td className="pupil__item_birht">{birth}</td>
      <td className="pupil__item_adress">{address}</td>
    </tr>
  );
};

export default PupilItem;
