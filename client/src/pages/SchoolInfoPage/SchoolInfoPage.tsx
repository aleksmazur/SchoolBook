import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Map from './../../components/Map/Map';
import { getSchoolInfo } from '../../thunks/school';
import { useTranslation } from 'react-i18next';

const SchoolInfoPage = () => {
  const schoolInfo = useAppSelector((state) => state.schoolInfo.schoolInfo);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getSchoolInfo());
  }, [dispatch]);

  return (
    <div>
      <h2>{t('info.about')}</h2>
      <div className="school__info">
        <h2>{schoolInfo.name}</h2>
        <div>
          {t('info.adress')}: {schoolInfo.adress}
        </div>
        <div>
          {t('info.phone')}: {schoolInfo.phone}
        </div>
        <div>E-mail: {schoolInfo.mail}</div>
      </div>
      <Map />
    </div>
  );
};

export default SchoolInfoPage;
