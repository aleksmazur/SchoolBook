import { Link } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
  return (
    <>
      <ul className="sidebar__ul">
        <Link to="/">
          <li className="sidebar__li active">
            <div className="sidebar__li-icon icon-main"></div>
            <div className="sidebar__li-text">Главная</div>
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
    </>
  );
};

export default SideBar;
