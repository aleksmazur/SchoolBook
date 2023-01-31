import { useNavigate } from 'react-router-dom';
import { IClass } from '../../pages/ClassPage/ClassPage';

const TeacherItem = ({ teacherId }: IClass) => {
  const navigate = useNavigate();

  return (
    <div className="teacher__item_name" onClick={() => navigate(`/pupils/${teacherId}`)}>
      *getTeacherName*
    </div>
  );
};

export default TeacherItem;
