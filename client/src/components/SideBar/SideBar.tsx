import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import ButtonBurger from '../ButtonBurger/ButtonBurger';
import './sideBar.css';

const SideBar = () => {
  const [activeSidebar, setActiveSideBar] = useState(false);
  /* const { role, id } = useAppSelector((state) => state.userInfo.userInfo); */
  const [role, id] = ['parent', 1];
  return (
    <>
      <ul className={activeSidebar ? 'sidebar__ul-none' : 'sidebar__ul'}>
        <Link to="/">
          <li className="sidebar__li active">
            <div className="sidebar__li-icon icon-main"></div>
            <div className="sidebar__li-text">Главная</div>
          </li>
        </Link>
        <Link to={`${role}/${id}`}>
          <li className="sidebar__li">
            <div className="sidebar__li-icon icon-profile"></div>
            <div className="sidebar__li-text">Профиль</div>
          </li>
        </Link>
        <Link to="/diary">
          <li className="sidebar__li">
            <div className="sidebar__li-icon icon-diary"></div>
            <div className="sidebar__li-text">Дневник</div>
          </li>
        </Link>
        <Link to="/schedule">
          <li className="sidebar__li">
            <div className="sidebar__li-icon icon-schedule"></div>
            <div className="sidebar__li-text">Расписание</div>
          </li>
        </Link>
        <Link to="/class">
          <li className="sidebar__li">
            <div className="sidebar__li-icon icon-class"></div>
            <div className="sidebar__li-text">Наш класс</div>
          </li>
        </Link>
      </ul>
      <ButtonBurger isOpen={activeSidebar} setActiveSideBar={setActiveSideBar} />
    </>
  );
};

export default SideBar;
