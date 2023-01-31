import { useTheme } from '../../hooks/useTheme';
import './togglerTheme.css';

const themes = {
  light: 'light',
  dark: 'dark',
};

const Toggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === themes.light) setTheme(themes.dark);
    if (theme === themes.dark) setTheme(themes.light);
  };

  return (
    <label className="switch" htmlFor="toggler">
      <input id="toggler" type="checkbox" readOnly onChange={changeTheme} />
      <span className="slider" />
      <span className="wave" />
    </label>
  );
};

export default Toggle;
