import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ButtonBurger from '../ButtonBurger/ButtonBurger';
import { isMobile } from 'react-device-detect';
import './sideBar.css';
import { getClassByID, getClassByIDTeacher } from '../../thunks/classes';
import { getChildrenByParent, getUserById } from '../../thunks/user';

const SideBar = () => {
  const { t } = useTranslation();
  const [activeSidebar, setActiveSideBar] = useState(false);
  const { userInfo } = useAppSelector((state) => state.userInfo);
  const { role, id, children } = userInfo;
  const classInfo = useAppSelector((state) => state.classInfo.classInfo);
  const dispatch = useAppDispatch();
  const path = window.location.pathname.split('/');
  const navigate = path[1];
  const [active, setActive] = useState(navigate === '' ? 'main' : navigate);
  const location = useLocation();

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

  useEffect(() => {
    if (role === 'parent' && children) {
      dispatch(getClassByID(children[0].classId));
    }
    if (role === 'teacher' && id) {
      dispatch(getClassByIDTeacher(id));
      if (role === 'teacher' && id && classInfo.id) {
        dispatch(getClassByID(classInfo.id));
      }
    }
  }, [children, dispatch, id, role, userInfo.id, classInfo.id]);

  useEffect(() => setActive(navigate), [location, navigate, setActive]);

  const toggleActiveNav = (e: React.MouseEvent<HTMLElement>) => {
    const currentTab = e.target as HTMLLIElement;
    if (!currentTab.classList.contains('sidebar__li')) {
      const activeTab = currentTab.parentElement?.dataset.link as string;
      setActive(activeTab);
    } else {
      const activeTab = currentTab.dataset.link as string;
      setActive(activeTab);
    }
    if (isMobile) {
      setActiveSideBar(false);
      const currentTargetTab = e.currentTarget as HTMLLIElement;
      const contentArea = currentTargetTab.parentElement?.lastChild as HTMLLIElement;
      contentArea.classList.remove('content-area-none');
    }
  };

  return (
    <>
      <ul
        onClick={toggleActiveNav}
        className={
          isMobile ? (activeSidebar ? 'sidebar__ul-full' : 'sidebar__ul-none') : 'sidebar__ul'
        }
      >
        <Link to="/">
          <li className={`sidebar__li ${'' === active ? 'active' : ''}`} data-link="main">
            <div className="sidebar__li-icon icon-main"></div>
            <div className="sidebar__li-text">{t('sidebar.main')}</div>
          </li>
        </Link>
        <Link to={`${role}/${id}`}>
          <li
            className={`sidebar__li ${'parent' === active || 'teacher' === active ? 'active' : ''}`}
            data-link={role}
          >
            <div className="sidebar__li-icon icon-profile"></div>
            <div className="sidebar__li-text">{t('sidebar.profile')}</div>
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
        {role === 'teacher' ? (
          <Link to="/journal">
            <li
              className={`sidebar__li ${'journal' === active ? 'active' : ''}`}
              data-link="journal"
            >
              <div className="sidebar__li-icon icon-diary"></div>
              <div className="sidebar__li-text">{t('sidebar.journal')}</div>
            </li>
          </Link>
        ) : (
          <Link to="/diary">
            <li className={`sidebar__li ${'diary' === active ? 'active' : ''}`} data-link="diary">
              <div className="sidebar__li-icon icon-diary"></div>
              <div className="sidebar__li-text">{t('sidebar.diary')}</div>
            </li>
          </Link>
        )}
        {role === 'parent' ? (
          <Link to="/grades">
            <li className={`sidebar__li ${'grades' === active ? 'active' : ''}`} data-link="grades">
              <div className="sidebar__li-icon icon-grades"></div>
              <div className="sidebar__li-text">{t('sidebar.grades')}</div>
            </li>
          </Link>
        ) : null}
        <Link to={children ? `/class/${children[0].classId}` : `/class/${classInfo.id}`}>
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
