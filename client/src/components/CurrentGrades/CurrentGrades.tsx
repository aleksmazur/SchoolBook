import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import './currentGrade.css';

const CurrentGrades = () => {
  const { t } = useTranslation();
  const finalGrade = useAppSelector((state) => state.diary.finalDiary);
  const { currentQuarter } = useAppSelector((state) => state.quarter);

  return (
    <div className="currentGrades__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('grades.subject')}</th>
            <th>{t('grades.currentGrades')}</th>
            <th>{t('grades.average')}</th>
          </tr>
        </thead>
        <tbody>
          {finalGrade &&
            Object.keys(finalGrade).map((item, ind) => {
              return (
                <tr className={ind % 2 ? 'tr__honest' : 'tr__odd'} key={ind}>
                  <td className="subject_id">{ind + 1}. </td>
                  <td className="subject_name">{item}</td>
                  <td className="subject_grade">
                    {finalGrade[item] && finalGrade[item][currentQuarter]
                      ? finalGrade[item][currentQuarter].grades.join(', ')
                      : ''}
                  </td>
                  <td className="subject_grade-average">
                    {finalGrade[item] &&
                    finalGrade[item][currentQuarter] &&
                    finalGrade[item][currentQuarter].average
                      ? finalGrade[item][currentQuarter].average.toFixed(2)
                      : ''}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentGrades;
