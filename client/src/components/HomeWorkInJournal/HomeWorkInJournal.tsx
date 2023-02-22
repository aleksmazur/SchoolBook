import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import HomeWorkItem from '../HomeWorkItem/HomeWorkItem';
import Preloader from '../Preloader/Preloader';
import './homeWorkInJournal.css';

const HomeWorkInJournal = () => {
  const { t } = useTranslation();
  const { isLoader, subjects } = useAppSelector((state) => state.subjects);

  return (
    <div className="homeWorkList__table">
      <table>
        <thead>
          <tr>
            <th>{t('journal.date')}</th>
            <th>{t('journal.task')}</th>
          </tr>
        </thead>
        <tbody>
          {!isLoader ? (
            <tr>
              <td>
                <Preloader />
              </td>
            </tr>
          ) : (
            subjects &&
            subjects.map((subject, ind) => {
              return (
                <HomeWorkItem
                  key={subject.id}
                  id={subject.id}
                  date={subject.date}
                  homework={subject.homework}
                  ind={ind}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeWorkInJournal;
