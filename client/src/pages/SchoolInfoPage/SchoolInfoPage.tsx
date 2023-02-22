import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Map from './../../components/Map/Map';
import { getSchoolInfo } from '../../thunks/school';

const SchoolInfoPage = () => {
  const schoolInfo = useAppSelector((state) => state.schoolInfo.schoolInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSchoolInfo());
  }, [dispatch]);

  return (
    <div>
      <h2>О школе</h2>
      <div className="school__info">
        <h2>{schoolInfo.name}</h2>
        <div>Адрес: {schoolInfo.adress}</div>
        <div>Телефон: {schoolInfo.phone}</div>
        <div>E-mail: {schoolInfo.mail}</div>
      </div>
      <Map />
    </div>
  );
};

export default SchoolInfoPage;
