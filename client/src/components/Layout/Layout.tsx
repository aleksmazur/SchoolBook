import { Outlet } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import './layout.css';

export const Layout = () => {
  const tokenState = useAppSelector((state) => state.userInfo.token.token);
  const token = (tokenState || localStorage.getItem('token')) as string;

  return (
    <div className="app-contain">
      <Header />
      <div className="content-container">
        {token && <SideBar />}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
