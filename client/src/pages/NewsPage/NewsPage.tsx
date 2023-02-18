import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NewsItem from '../../components/NewsItem/NewsItem';
import Preloader from '../../components/Preloader/Preloader';
import { INewsItem } from '../../reducers/newsReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNews, postNews } from '../../thunks/news';
import './newsPage.css';

const NewsPage = () => {
  const { t } = useTranslation();
  const { news, isLoader } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<INewsItem>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const onSubmitForm: SubmitHandler<INewsItem> = async (data) => {
    const formData = new FormData();
    if (data.image) formData.append('image', data.image[0]);
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    await dispatch(postNews(formData));
    dispatch(getNews());
  };

  return (
    <div>
      <div className="school__info">
        <h2>Гимназия № 1 г. Минск</h2>
        <div>Адрес: 220000, г. Минск, улица Мира, 1</div>
        <div>Телефон: +375 214 52-32-61 (приёмная)</div>
        <div>E-mail: gimn1@edum.by</div>
      </div>

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
      <div className="news__form">
        <h3>{t('news.addNewsTitle')}</h3>
        <form id="addNews" className="form addNews-form" method="post">
          <div className="news__inputs">
            <div className="news_header">
              <div>
                <label htmlFor="news_title">{t('news.addTitle')}</label>
                <input
                  id="news_title"
                  {...register('title', { required: true })}
                  type="text"
                  className="add__news-input"
                />
              </div>
              <div>
                <label htmlFor="news_picture">
                  <div className="input__file-button-text">
                    {t('news.addPicture')}
                    <div className="input__file-button-img"></div>
                  </div>
                </label>
                <input
                  id="news_picture"
                  {...register('image')}
                  type="file"
                  className="add__news-file-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="news_content">{t('news.content')}</label>
              <textarea
                id="news_content"
                {...register('content', { required: true })}
                className="add__news-input"
              />
            </div>
          </div>
          <button
            className="btn-block__addNews btn"
            type="submit"
            onClick={handleSubmit(onSubmitForm)}
          >
            {t('news.addNewsBtn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsPage;
