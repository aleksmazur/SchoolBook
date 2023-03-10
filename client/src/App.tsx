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
import { RequireAuth } from './hoc/RequireAuth';
import PupilCard from './components/PupilCard/PupilCard';
import GradesPage from './pages/GradesPage/GradesPage';
import JournalPage from './pages/JournalPage/JournalPage';
import SchoolInfoPage from './pages/SchoolInfoPage/SchoolInfoPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="diary"
            element={
              <RequireAuth>
                <DiaryPage />
              </RequireAuth>
            }
          />
          <Route
            path="grades"
            element={
              <RequireAuth>
                <GradesPage />
              </RequireAuth>
            }
          />
          <Route
            path=":parent/:id"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/journal"
            element={
              <RequireAuth>
                <JournalPage />
              </RequireAuth>
            }
          />
          <Route
            path="schedule"
            element={
              <RequireAuth>
                <SchedulePage />
              </RequireAuth>
            }
          />
          <Route
            path="class/:id"
            element={
              <RequireAuth>
                <ClassPage />
              </RequireAuth>
            }
          />
          <Route
            path="class/children/:id"
            element={
              <RequireAuth>
                <PupilCard />
              </RequireAuth>
            }
          />
          <Route
            path="news"
            element={
              <RequireAuth>
                <NewsPage />
              </RequireAuth>
            }
          />
          <Route
            path="info"
            element={
              <RequireAuth>
                <SchoolInfoPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
