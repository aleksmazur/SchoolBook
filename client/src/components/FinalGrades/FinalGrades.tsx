import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import './finalGrades.css';

const FinalGrades = () => {
  const { t } = useTranslation();
  const { finalDiary } = useAppSelector((state) => state.diary);
  const { currentQuarter } = useAppSelector((state) => state.quarter);
  return (
    <div className="finalGrades__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('grades.subject')}</th>
            <th>I {t('diary.quarter')}</th>
            <th>II {t('diary.quarter')}</th>
            <th>III {t('diary.quarter')}</th>
            <th>IV {t('diary.quarter')}</th>
            <th>{t('grades.finalGrades')}</th>
          </tr>
        </thead>
        <tbody>
          {finalDiary &&
            Object.keys(finalDiary).map((item, ind) => {
              return (
                <tr className={ind % 2 ? 'tr__honest' : 'tr__odd'} key={ind}>
                  <td className="subject_id">{ind + 1}. </td>
                  <td className="subject_name">{item}</td>
                  {Object.keys(finalDiary[item]).map((quarter, i) => {
                    return (
                      <td key={i} className="subject_quarter">
                        {finalDiary[item] &&
                        finalDiary[item][quarter] &&
                        finalDiary[item][quarter].average &&
                        +quarter < currentQuarter
                          ? finalDiary[item][quarter].average.toFixed()
                          : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FinalGrades;
