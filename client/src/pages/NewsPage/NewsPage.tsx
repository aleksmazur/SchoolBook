import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewsItem from '../../components/NewsItem/NewsItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNews } from '../../thunks/news';
import './newsPage.css';

const NewsPage = () => {
  const { t } = useTranslation();
  const { news } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <div className="school__info">
        <h2>Гимназия № 1 г. Минск</h2>
        <div>Адрес: 220000, г. Минск, улица Мира, 1</div>
        <div>Телефон: +375 214 52-32-61 (приёмная)</div>
        <div>E-mail: gimn1@edum.by</div>
      </div>

      <h2>{t('news.newsTitle')}</h2>
      <div className="news__list">
        {news.map((newsItem, index) => {
          return <NewsItem {...newsItem} key={index} />;
        })}
      </div>
    </div>
  );
};

export default NewsPage;
