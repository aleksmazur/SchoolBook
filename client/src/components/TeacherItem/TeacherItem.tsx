import { BASE_URL } from '../../constants/baseUrl';
import { useAppSelector } from '../../store/hooks';

const TeacherItem = () => {
  const { classTeacher } = useAppSelector((state) => state.classInfo.classInfo);

  return (
    <div className="teacher__item_name">
      <div className="profile__photo">
        <img
          src={`${BASE_URL}/${classTeacher?.profilePic}`}
          className="profile__photo-image"
          alt="Фото"
        />
      </div>
      {classTeacher?.firstName + ' ' + classTeacher?.lastName}
    </div>
  );
};

export default TeacherItem;
