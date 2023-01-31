import { Route, Routes } from 'react-router-dom';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import ClassPage from './pages/ClassPage/ClassPage';
import './app.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="diary" element={<DiaryPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="class" element={<ClassPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
