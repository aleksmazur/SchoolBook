import { useTranslation } from 'react-i18next';
import './togglerLang.css';

const TogglerLang = () => {
  const { i18n } = useTranslation();

  const changeLang = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="select">
      <select className="footer__change-lang" onChange={(e) => changeLang(e.target.value)}>
        <option value="en">EN</option>
        <option value="ru">РУС</option>
      </select>
    </div>
  );
};

export default TogglerLang;
