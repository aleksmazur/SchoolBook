import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
  const { t } = useTranslation();

  const navigate = window.location.pathname.slice(1);

  const [active, setActive] = useState(navigate === '' ? 'main' : navigate);

  const toggleActiveNav = (e: React.MouseEvent<HTMLElement>) => {
    const currentTab = e.target as HTMLLIElement;
    if (!currentTab.classList.contains('sidebar__li')) {
      const activeTab = currentTab.parentElement?.dataset.link as string;
      setActive(activeTab);
    } else {
      const activeTab = currentTab.dataset.link as string;
      setActive(activeTab);
    }
  };

  return (
    <>
      <ul onClick={toggleActiveNav} className="sidebar__ul">
        <Link to="/">
          <li className={`sidebar__li ${'main' === active ? 'active' : ''}`} data-link="main">
            <div className="sidebar__li-icon icon-main"></div>
            <div className="sidebar__li-text">{t('sidebar.main')}</div>
          </li>
        </Link>
        <Link to="/diary">
          <li className={`sidebar__li ${'diary' === active ? 'active' : ''}`} data-link="diary">
            <div className="sidebar__li-icon icon-diary"></div>
            <div className="sidebar__li-text">{t('sidebar.diary')}</div>
          </li>
        </Link>
        <Link to="/schedule">
          <li
            className={`sidebar__li ${'schedule' === active ? 'active' : ''}`}
            data-link="schedule"
          >
            <div className="sidebar__li-icon icon-schedule"></div>
            <div className="sidebar__li-text">{t('sidebar.schedule')}</div>
          </li>
        </Link>
        <Link to="/class">
          <li className={`sidebar__li ${'class' === active ? 'active' : ''}`} data-link="class">
            <div className="sidebar__li-icon icon-class"></div>
            <div className="sidebar__li-text">{t('sidebar.class')}</div>
          </li>
        </Link>
        <Link to="/news">
          <li className={`sidebar__li ${'news' === active ? 'active' : ''}`} data-link="news">
            <div className="sidebar__li-icon icon-news"></div>
            <div className="sidebar__li-text">{t('sidebar.news')}</div>
          </li>
        </Link>
      </ul>
    </>
  );
};

export default SideBar;