import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/diary">Diary</Link>
      <Link to="/schedule">Schedule</Link>
    </>
  );
};

export default MainPage;
