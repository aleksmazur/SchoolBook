import { useTranslation } from 'react-i18next';
import './mainPage.css';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="main__info">
        <h2>{t('main.schoolBook')}</h2>
        <p>{t('main.p1')}</p>
        <div className="main__percents">
          <div className="main__percents-item">
            <div className="main__percents-20"></div>
            <div className="main__percents-20-text">{t('main.20percent')}</div>
          </div>
          <div className="main__percents-item">
            <div className="main__percents-80"></div>
            <div className="main__percents-80-text">{t('main.80percent')}</div>
          </div>
          <div className="main__percents-item">
            <div className="main__percents-15"></div>
            <div className="main__percents-15-text">{t('main.15percent')}</div>
          </div>
        </div>
        <p>{t('main.p2')}</p>
        <h3>{t('main.subtitle')}</h3>
      </div>
    </>
  );
};

export default MainPage;
