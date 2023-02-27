import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/baseUrl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getChildrenById } from '../../thunks/user';
import Preloader from '../Preloader/Preloader';
import './pupil.css';

const PupilCard = () => {
  const { t } = useTranslation();

  const path = window.location.pathname.split('/');
  const pupilId = +path[path.length - 1];
  const dispatch = useAppDispatch();

  const { classInfo } = useAppSelector((state) => state.classInfo);
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const { fullName, birthday, adress, parents, id, profilePic, isLoading } = useAppSelector(
    (state) => state.classInfo.currentPupil
  );

  useEffect(() => {
    dispatch(getChildrenById(String(pupilId)));
  }, [pupilId, dispatch]);

  const renderInfoParents = () => {
    if (parents) {
      const info = parents.map((parent, ind) => {
        return (
          <p key={ind}>
            <span>{parent.fullName}</span>
          </p>
        );
      });
      return info;
    }
  };

  return (
    <div className="pupil">
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="pupil__content">
          <div className="pupil__photo">
            <img src={`${BASE_URL}/${profilePic}`} className="profile__photo-image" alt="Фото" />
          </div>
          <div className="pupil__info">
            <h3 className="pupil__title">{fullName}</h3>
            <div className="pupil__birthday">
              {' '}
              {t('class.birth')}: {moment(birthday).utc().format('YYYY-MM-DD')}
            </div>
            <div className="pupil__adress">
              {t('class.address')}: {adress}
            </div>
            <div className="pupil__class">
              {t('profile.class')} <Link to={`/class/${classInfo.id}`}>{classInfo.className}</Link>
            </div>
            {
              <div className="pupil__info-relative">
                {t('profile.parents')}:
                {parents ? renderInfoParents() : 'Нет зарегистрированных родителей'}
              </div>
            }
            {children && id === children[0].id && (
              <div className="pupil__progress">
                <Link to={`/diary`}>Смотреть дневник</Link>
                <Link to={`/grades`}>Смотреть успеваемость</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PupilCard;
