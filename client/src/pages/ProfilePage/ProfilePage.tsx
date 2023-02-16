import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/baseUrl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getChildrenByParent, getUserById } from '../../thunks/user';
import './profile.css';

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { role, id, gender, fullName, profilePic, username, children } = userInfo;
  const { classInfo } = useAppSelector((state) => state.classInfo);

  useEffect(() => {
    if (role === 'parent') {
      if (id) {
        dispatch(getChildrenByParent(id));
      }
    }
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id, role]);

  const renderInfoChildren = () => {
    if (role === 'parent' && children) {
      const info = children.map((child, ind) => {
        return (
          <p key={ind}>
            <span>Ученик: </span>
            <Link to={`/class/children/${child.id}`}>
              {child.lastName} {child.firstName} {child.middleName}
            </Link>
            <br />
            <span>Класс: </span>
            <Link to={`/class/${child.class.id}`}> {child.class.className}</Link>
          </p>
        );
      });
      return info;
    }
  };

  return (
    <div className="profile">
      <h2>{t('profile.profileTitle')}</h2>
      <div className="profile__content">
        <div className="profile__photo">
          <img src={`${BASE_URL}/${profilePic}`} className="profile__photo-image" alt="Фото" />
        </div>
        <div className="profile__info">
          <h3 className="profile__title">{fullName}</h3>
          <div className="profile__role">
            {' '}
            Роль:{' '}
            {role === 'teacher'
              ? t('profile.teacher')
              : gender === 'male'
              ? t('profile.father')
              : t('profile.mother')}
          </div>
          <div className="profile__email">Логин: {username}</div>
          <div className="profile__info-relative">
            {children ? renderInfoChildren() : null}
            {role === 'teacher' ? (
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
