import { useTranslation } from 'react-i18next';
import NewsItem from '../../components/NewsItem/NewsItem';
import './newsPage.css';

const newsList = [
  {
    title: 'Экскурсия на "Линию Сталина"',
    text: '2 октября учащиеся 5-х классов побывали на экскурсии в мемориальном комплексе "Линия Сталина", посетили музей авиационной техники. Это был самый мощный укрепрайон Белорусского военного округа.',
    photo: 'https://www.nd.ru/images/products/266000/266000_screenshot_big_06.jpg',
  },
  {
    title: 'Зарядка с папой',
    text: 'Здоровый образ жизни начинается с детства. И главную роль здесь играют родители. Полезно начинать день с зарядки, а если рядом любимый папа, то это еще и игра, и масса положительных эмоций.',
    photo:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/a73baae2-c93c-421a-a6d3-f31e81fa6a7b/1920x',
  },
  {
    title: 'Питание в школе: как изменится рацион и что в меню сейчас',
    text: 'В начавшейся третьей четверти школьникам на обед уже начали предлагать на выбор 2 комплекса: гарнир со свиной отбивной или с куриной котлетой. Как рассказала директор Комбината школьного питания Надежда Лукашевич, на появление новых блюд влияют не только рекомендации специалистов, но и пожелания детей и родителей. Помимо обновленного гарнира, с 9 января в трех школах Минска появилось ассорти из брокколи, спаржи, гороха и цветной капусты – овощи готовятся на пару. Кроме вязких каш повара будут готовить рассыпчатые, а вместо сосисок школьникам предложат запеченные колбаски. В случае, если новые блюда понравятся ученикам, вероятно, их будут готовить и в других учреждениях.',
    photo:
      'https://avatars.mds.yandex.net/get-vthumb/880825/377dbc4679b17c0023e1b20d7036841f/564x318_1',
  },
  {
    title: 'Весенний субботник',
    text: 'В нашей школе стало хорошей традицией проводить весенние субботники. Для проведения субботника был составлен план мероприятий генеральной уборки. За каждым классом была закреплена своя территория. Субботник прошел очень воодушевленно и активно, все были полны задора и желания ухаживать за своей родной природой, ведь природа, окружающая мир - это наш дом. Теперь вокруг нашей школы и прилегающей к ней территории чистота и порядок.',
    photo: 'https://www.nd.ru/images/products/266000/266000_screenshot_big_03.jpg',
  },
];

const NewsPage = () => {
  const { t } = useTranslation();

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
        {newsList.map((newsItem, index) => {
          return <NewsItem {...newsItem} key={index} />;
        })}
      </div>
    </div>
  );
};

export default NewsPage;
