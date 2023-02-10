import { BASE_URL } from '../../constants/baseUrl';
import { INewsItem } from '../../reducers/newsReducer';
import './newsItem.css';

const NewsItem = ({ title, content, image }: INewsItem) => {
  return (
    <div className="news__item">
      <div className="news__desc">
        <h4 className="news__title">{title}</h4>
        <div className="news__text">{content}</div>
      </div>
      {image && (
        <div className="news__photo">
          <img src={`${BASE_URL}/${image}`} className="news__photo-image" alt="Фото" />
        </div>
      )}
    </div>
  );
};

export default NewsItem;
