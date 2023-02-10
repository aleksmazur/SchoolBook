import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const TeacherItem = () => {
  const navigate = useNavigate();
  const { classTeacher } = useAppSelector((state) => state.classInfo.classInfo);

  return (
    <div
      className="teacher__item_name"
      onClick={() => navigate(`/class/teacher/${classTeacher?.id}`)}
    >
      {classTeacher?.firstName + ' ' + classTeacher?.lastName}
    </div>
  );
};

export default TeacherItem;
