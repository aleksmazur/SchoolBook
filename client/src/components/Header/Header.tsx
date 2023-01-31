import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toggleActiveModal } from '../../reducers/modalReducer';
import { setToken } from '../../reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './header.css';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tokenState = useAppSelector((state) => state.userInfo.token.token);
  const token = (tokenState || localStorage.getItem('token')) as string;
  const userName = 'user';
  if (token) {
    //менять userName получая его из информации о пользователе
  }

  const logoutUser = () => {
    dispatch(setToken({ token: null }));
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const openModal = () => {
    dispatch(toggleActiveModal());
  };

  return (
    <header className="header">
      <div className="header__home-button">
<<<<<<< HEAD
        <Link to="/">{t('header.schoolBook')}</Link>
=======
        <div className="header__logo"></div>
        <Link to="/">School Book</Link>
>>>>>>> 8d04cbe (feat: add asidebar)
      </div>
      <div className="header__button-block">
        {!localStorage.getItem('token') && (
          <button className="header__login" onClick={() => openModal()}>
            {t('header.login')}
          </button>
        )}
        {localStorage.getItem('token') && (
          <div className="header__user-name-block">
            <span>{userName}</span>
            <span className="header__action-button" onClick={logoutUser}>
              {t('header.logout')}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
