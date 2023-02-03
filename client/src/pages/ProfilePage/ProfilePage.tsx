import { useAppSelector } from '../../store/hooks';
import './profile.css';

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.userInfo);

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__image" />
        <div className="profile__info">
          <h3 className="profile__title">ФИО {userInfo.name}</h3>
          <div className="profile__role"> Роль {userInfo.role}</div>
          <div className="profile__email">Логин {userInfo.username}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
