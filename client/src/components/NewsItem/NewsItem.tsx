import { BASE_URL } from '../../constants/baseUrl';
import { INewsItem } from '../../reducers/newsReducer';
import { isMobile } from 'react-device-detect';
import './newsItem.css';

const NewsItem = ({ title, content, image, createdAt }: INewsItem) => {
  return (
    <div className="news__item">
      <div className={isMobile ? `news__desc-full` : `news__desc`}>
        <div className="news__title">
          <h6>{createdAt && new Date(Date.parse(createdAt)).toLocaleDateString('ru-RU')}</h6>
          <h3>{title}</h3>
        </div>
        <div className="news__text">{content}</div>
      </div>
      {!isMobile && image && (
        <div className="news__photo">
          <img src={`${BASE_URL}/${image}`} className="news__photo-image" alt="Фото" />
        </div>
      )}
    </div>
  );
};

export default NewsItem;
