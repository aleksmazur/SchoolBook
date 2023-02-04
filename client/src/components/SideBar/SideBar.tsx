import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ButtonBurger from '../ButtonBurger/ButtonBurger';
import { isMobile } from 'react-device-detect';
import { getChildrenByParent } from '../../thunks/user';
import './sideBar.css';
import { getClassByID } from '../../thunks/classes';

const SideBar = () => {
  const { t } = useTranslation();
  const [activeSidebar, setActiveSideBar] = useState(false);
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { role, id, children } = userInfo;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (role === 'parent') {
      if (id) {
        dispatch(getChildrenByParent(id));
      }
    }
  }, [id]);

  useEffect(() => {
    if (role === 'parent') {
      if (children) {
        dispatch(getClassByID(children[0].classId));
      }
    }
  }, [children]);

  const path = window.location.pathname.split('/');
  const navigate = path[path.length - 2];
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
      <ul
        onClick={toggleActiveNav}
        className={isMobile && !activeSidebar ? 'sidebar__ul-none' : 'sidebar__ul'}
      >
        <Link to="/">
          <li className={`sidebar__li ${'main' === active ? 'active' : ''}`} data-link="main">
            <div className="sidebar__li-icon icon-main"></div>
            <div className="sidebar__li-text">{t('sidebar.main')}</div>
          </li>
        </Link>
        <Link to={`${role}/${id}`}>
          <li
            className={`sidebar__li ${
              'parent' === active || 'children' === active ? 'active' : ''
            }`}
            data-link={role}
          >
            <div className="sidebar__li-icon icon-profile"></div>
            <div className="sidebar__li-text">{t('sidebar.profile')}</div>
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
        <Link to={children ? `/class/${children[0].classId}` : '/class'}>
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
      {isMobile && <ButtonBurger isOpen={activeSidebar} setActiveSideBar={setActiveSideBar} />}
    </>
  );
};

export default SideBar;
