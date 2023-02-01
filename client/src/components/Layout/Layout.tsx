import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import './layout.css';

export const Layout = () => {
  return (
    <div className="app-contain">
      <Header />
      <div className="content-container">
        <SideBar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
