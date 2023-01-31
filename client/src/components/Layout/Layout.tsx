import { Outlet } from 'react-router';
import { Header } from '../Header/Header';

export const Layout = () => {
  return (
    <div className="app-contain">
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
      {/*      <Footer /> */}
    </div>
  );
};
