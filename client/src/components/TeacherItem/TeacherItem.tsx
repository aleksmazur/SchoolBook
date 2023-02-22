import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../constants/baseUrl';
import { useAppSelector } from '../../store/hooks';
import './teachetItem.css';

const TeacherItem = () => {
  const { classTeacher } = useAppSelector((state) => state.classInfo.classInfo);
  const { t } = useTranslation();

  return (
    <>
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
      <div className="profile__phone">
        <a href={`tel: ${classTeacher?.phone}`}>
          {t('profile.phone')}: {classTeacher?.phone}
        </a>
      </div>
    </>
  );
};

export default TeacherItem;
