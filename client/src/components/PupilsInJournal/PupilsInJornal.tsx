import { useTranslation } from 'react-i18next';
import { IChildren } from '../../reducers/userReducer';
import { useAppSelector } from '../../store/hooks';
import PupilItemInJournal from '../PupilItemInJournal/PupilItemInJournal';
import './pupilsInJournal.css';

export const getDate = (date: string): string => {
  const day =
    new Date(date.substring(0, 10)).getDate().toString().length < 2
      ? `0${new Date(date.substring(0, 10)).getDate().toString()}`
      : new Date(date.substring(0, 10)).getDate().toString();
  const month =
    (new Date(date.substring(0, 10)).getMonth() + 1).toString().length < 2
      ? `0${(new Date(date.substring(0, 10)).getMonth() + 1).toString()}`
      : (new Date(date.substring(0, 10)).getMonth() + 1).toString();
  return `${day}.${month}`;
};

const PupilsInJornal = () => {
  const { t } = useTranslation();

  const childrens = useAppSelector((state) => state.classInfo.classInfo.childrens);
  const subjects = useAppSelector((state) => state.subjects.subjects);

  return (
    <div className="pupilsInJournal__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('journal.name')}</th>
            {subjects &&
              subjects.map((sub, ind) => (
                <th key={ind} data-idlesson={sub.id}>
                  {getDate(sub.date)}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {childrens
            ? childrens.map((pupil: IChildren, ind: number) => {
                return (
                  <PupilItemInJournal key={ind} num={ind} id={pupil.id} fullName={pupil.fullName} />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default PupilsInJornal;
