import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import './layout.css';

export const Layout = () => {
  return (
    <div className="app-contain">
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
