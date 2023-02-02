import './newsItem.css';

type INewsItem = {
  title: string;
  text: string;
  photo: string;
};

const NewsItem = ({ title, text, photo }: INewsItem) => {
  return (
    <div className="news__item">
      <div className="news__desc">
        <h4 className="news__title">{title}</h4>
        <div className="news__text">{text}</div>
      </div>
      <div className="news__photo">
        <img src={photo} className="news__photo-image" alt="Фото" />
      </div>
    </div>
  );
};

export default NewsItem;
