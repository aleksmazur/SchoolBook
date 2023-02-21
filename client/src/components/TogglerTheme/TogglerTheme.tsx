import { useEffect } from 'react';
import { setTheme } from '../../reducers/settingReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './togglerTheme.css';

const themes = {
  light: 'light',
  dark: 'dark',
};

const TogglerTheme = () => {
  const theme = useAppSelector((state) => state.setting.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeTheme = () => {
    if (theme === themes.light) dispatch(setTheme(themes.dark));
    if (theme === themes.dark) dispatch(setTheme(themes.light));
  };

  return (
    <label className="switch" htmlFor="toggler">
      <input id="toggler" type="checkbox" readOnly onChange={changeTheme} />
      <span className="slider" />
      <span className="wave" />
    </label>
  );
};

export default TogglerTheme;
