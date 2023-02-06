import { INewsItem } from '../../reducers/newsReducer';
import './newsItem.css';

const NewsItem = ({ title, content }: INewsItem) => {
  return (
    <div className="news__item">
      <div className="news__desc">
        <h4 className="news__title">{title}</h4>
        <div className="news__text">{content}</div>
      </div>
      {/* <div className="news__photo">
        <img src={photo} className="news__photo-image" alt="Фото" />
      </div> */}
    </div>
  );
};

export default NewsItem;
