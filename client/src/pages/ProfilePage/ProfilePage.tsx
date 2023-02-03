import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getChildrenByParent } from '../../thunks/user';
import './profile.css';

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo.role === 'parent') {
      if (userInfo.id) {
        dispatch(getChildrenByParent(userInfo.id));
      }
    }
  }, [userInfo.id]);

  const renderInfoChildren = () => {
    if (userInfo.role === 'parent' && userInfo.children) {
      const info = userInfo.children.map((child, ind) => {
        return (
          <p key={ind}>
            <span>Ученик: </span>
            <Link to={`/children/${child.id}`}>
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
        <div className="profile__image" />
        <div className="profile__info">
          <h3 className="profile__title">ФИО {userInfo.name}</h3>
          <div className="profile__role"> Роль {userInfo.role}</div>
          <div className="profile__email">Логин {userInfo.username}</div>
          <div className="profile__info-relative">
            {userInfo.children ? renderInfoChildren() : 'Нет зарегистрированных детей'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
