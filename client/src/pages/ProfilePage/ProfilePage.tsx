import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/baseUrl';
import { useAppSelector } from '../../store/hooks';
import './profile.css';

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { classInfo } = useAppSelector((state) => state.classInfo);

  const renderInfoChildren = () => {
    if (userInfo.role === 'parent' && userInfo.children) {
      const info = userInfo.children.map((child, ind) => {
        return (
          <p key={ind}>
            <span>Ученик: </span>
            <Link to={`/class/children/${child.id}`}>
              {child.lastName} {child.firstName} {child.middleName}
            </Link>
            <span>, обучается в классе: </span>
            <Link to={`/class/${child.class.id}`}> {child.class.className}</Link>
          </p>
        );
      });
      return info;
    }
  };

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__photo">
          <img
            src={`${BASE_URL}/${userInfo.profilePic}`}
            className="profile__photo-image"
            alt="Фото"
          />
        </div>
        <div className="profile__info">
          <h3 className="profile__title">ФИО {userInfo.fullName}</h3>
          <div className="profile__role"> Роль {userInfo.role}</div>
          <div className="profile__email">Логин {userInfo.username}</div>
          <div className="profile__info-relative">
            {userInfo.children ? renderInfoChildren() : null}
            {userInfo.role === 'teacher' ? (
              <span>
                Учитель в <Link to={`/class/${classInfo.id}`}>{classInfo.className}</Link>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
