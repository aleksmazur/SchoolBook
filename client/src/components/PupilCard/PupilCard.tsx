import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getChildrenById } from '../../thunks/user';
import Preloader from '../Preloader/Preloader';
import './pupil.css';

const PupilCard = () => {
  const path = window.location.pathname.split('/');
  const pupilId = +path[path.length - 1];
  const dispatch = useAppDispatch();

  const { classInfo } = useAppSelector((state) => state.classInfo);
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const { fullName, birthday, adress, parents, id, isLoading } = useAppSelector(
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
          <div className="pupil__image" />
          <div className="pupil__info">
            <h3 className="pupil__title">{fullName}</h3>
            <div className="pupil__birthday">
              {' '}
              Дата рождения: {moment(birthday).utc().format('YYYY-MM-DD')}
            </div>
            <div className="pupil__adress">Адрес: {adress}</div>
            <div className="pupil__class">
              Класс: <Link to={`/class/${classInfo.id}`}>{classInfo.className}</Link>
            </div>
            {
              <div className="pupil__info-relative">
                Родители:
                {parents ? renderInfoParents() : 'Нет зарегистрированных родителей'}
              </div>
            }
            {children && id === children[0].id && (
              <div className="pupil__progress">
                <Link to={`/diary`}>Смотреть дневник</Link>
                <Link to={`/progress`}>Смотреть успеваемость</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PupilCard;
