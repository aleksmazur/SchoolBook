import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const TeacherItem = () => {
  const navigate = useNavigate();
  const teacherId = useAppSelector((state) => state.classInfo.classInfo.classTeacherId);

  return (
    <div className="teacher__item_name" onClick={() => navigate(`/pupils`)}>
      *getTeacherName* {teacherId}
    </div>
  );
};

export default TeacherItem;
