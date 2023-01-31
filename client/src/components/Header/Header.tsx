import { Link, useNavigate } from 'react-router-dom';
import { toggleActiveModal } from '../../reducers/modalReducer';
import { setToken } from '../../reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Toggle from '../TogglerTheme/TogglerTheme';
import './header.css';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    console.log('openModal: ', openModal);
    dispatch(toggleActiveModal());
  };

  return (
    <header className="header">
      <div className="header__home-button">
        <Link to="/">School Book</Link>
      </div>
      <Toggle />
      <div className="header__button-block">
        {!localStorage.getItem('token') && (
          <button className="header__login" onClick={() => openModal()}>
            Log in
          </button>
        )}
        {localStorage.getItem('token') && (
          <div className="header__user-name-block">
            <span>{userName}</span>
            <span className="header__action-button" onClick={logoutUser}>
              Log Out
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
