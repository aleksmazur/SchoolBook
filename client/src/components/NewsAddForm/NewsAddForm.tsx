import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { INewsItem } from '../../reducers/newsReducer';
import { useAppDispatch } from '../../store/hooks';
import { getNews, postNews } from '../../thunks/news';

const NewsAddForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isPicture, addPicture] = useState(false);
  const { register, handleSubmit } = useForm<INewsItem>({
    mode: 'onSubmit',
  });

  const onSubmitForm: SubmitHandler<INewsItem> = async (data) => {
    const formData = new FormData();
    if (data.image) {
      formData.append('image', data.image[0]);
    }
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    await dispatch(postNews(formData));
    addPicture(false);
    dispatch(getNews());
  };

  const loadImg = () => {
    addPicture(true);
  };

  return (
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
              <label htmlFor="news_picture" className="addnews__btn">
                {t('news.addPicture')}
                <div
                  className={isPicture ? `input__file-button-text load` : `input__file-button-text`}
                >
                  <div className="input__file-button-img"></div>
                </div>
              </label>
              <input
                onInput={loadImg}
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
  );
};

export default NewsAddForm;
