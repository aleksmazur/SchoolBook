/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toggleActiveModal } from '../../reducers/modalReducer';
import { setServiceInfo, setToken, setUserInfo } from '../../reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import jwt_decode from 'jwt-decode';
import './header.css';
import { useEffect } from 'react';

export type IUserFromToken = {
  exp: number;
  iat: number;
  id: string;
  role: {
    description: string;
    id: number;
    value: string;
  }[];
  username: string;
  fullName: string;
};

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tokenState = useAppSelector((state) => state.userInfo.token.token);
  const token = (tokenState || localStorage.getItem('token')) as string;
  let userName = t('header.userName');

  if (token) {
    const decodedToken: IUserFromToken = jwt_decode(token);
    userName = decodedToken.fullName;
  }

  useEffect(() => {
    if (token) {
      const decodedToken: IUserFromToken = jwt_decode(token);
      dispatch(setUserInfo({ username: decodedToken.username, fullName: decodedToken.fullName }));
      dispatch(setToken(token));
      dispatch(setServiceInfo(token));
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(setServiceInfo(token));
    }
  }, [token]);

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
        <div className="header__logo">
          <Link to="/">{t('header.schoolBook')}</Link>
        </div>
      </div>
      <div className="header__button-block">
        {!localStorage.getItem('token') && (
          <>
            <div className="header__username">{userName}</div>
            <button className="header__login btn" onClick={() => openModal()}>
              {t('header.login')}
            </button>
          </>
        )}
        {localStorage.getItem('token') && (
          <div className="header__user-name-block">
            <div className="header__username">{userName}</div>
            <button className="header__action-button btn" onClick={logoutUser}>
              {t('header.logout')}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
