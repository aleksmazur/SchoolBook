import { Route, Routes } from 'react-router-dom';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Page404 from './pages/Page404/Page404';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import ClassPage from './pages/ClassPage/ClassPage';
import { Layout } from './components/Layout/Layout';
import './app.css';
import NewsPage from './pages/NewsPage/NewsPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="diary" element={<DiaryPage />} />
          <Route path="parent/:id" element={<ProfilePage />} />
          <Route path="children/:id" element={<ProfilePage />} />
          {/* <Route path="teacher/:id" element={<TeacherPage />} /> */}
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="class" element={<ClassPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
