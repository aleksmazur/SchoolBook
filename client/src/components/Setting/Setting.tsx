import { setSettingStatus } from '../../reducers/settingReducer';
import { useAppDispatch } from '../../store/hooks';
import TogglerLang from '../SelectLang/TogglerLang';
import TogglerTheme from '../TogglerTheme/TogglerTheme';
import './setting.css';

const Setting = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="setting-modal">
      <TogglerTheme />
      <TogglerLang />
      <span
        className="close__modal close__setting"
        onClick={() => dispatch(setSettingStatus())}
      ></span>
    </div>
  );
};

export default Setting;
