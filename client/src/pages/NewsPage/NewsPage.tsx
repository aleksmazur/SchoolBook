import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewsAddForm from '../../components/NewsAddForm/NewsAddForm';
import NewsItem from '../../components/NewsItem/NewsItem';
import Preloader from '../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNews } from '../../thunks/news';
import './newsPage.css';

const NewsPage = () => {
  const { t } = useTranslation();
  const { news, isLoader } = useAppSelector((store) => store.news);
  const { role } = useAppSelector((state) => state.userInfo.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <h2>{t('news.newsTitle')}</h2>
      {isLoader ? (
        <Preloader />
      ) : (
        <div className="news__list">
          {news.map((newsItem, index) => {
            return <NewsItem {...newsItem} key={index} />;
          })}
        </div>
      )}
      {role === 'teacher' && <NewsAddForm />}
    </div>
  );
};

export default NewsPage;
