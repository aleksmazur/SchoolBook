import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const TeacherItem = () => {
  const navigate = useNavigate();
  const { firstName, lastName, id } = useAppSelector(
    (state) => state.classInfo.classInfo.classTeacher!
  );

  return (
    <div className="teacher__item_name" onClick={() => navigate(`/class/teacher/${id}`)}>
      {firstName + ' ' + lastName}
    </div>
  );
};

export default TeacherItem;
