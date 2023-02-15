/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentQuarter } from '../../reducers/quarterReducer';
import { getQuarter } from '../../thunks/quarter';
import { getFinalDiary } from '../../thunks/diary';
import './currentGrade.css';

const CurrentGrades = () => {
  const finalGrade = useAppSelector((state) => state.diary.finalDiary);
  const { quarter, currentQuarter } = useAppSelector((state) => state.quarter);
  const { children } = useAppSelector((state) => state.userInfo.userInfo);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const today = new Date().getTime();
    quarter.forEach((item) => {
      const startDate = new Date(item.startDate).getTime();
      const endDate = new Date(item.endDate).getTime();
      if (today > startDate && today < endDate) {
        dispatch(setCurrentQuarter(item.quarter));
      }
    });
    dispatch(getQuarter());
    if (children && idClass) {
      const idPupil = children[0].id;
      dispatch(getFinalDiary({ idPupil, idClass }));
    }
  }, [dispatch, children, idClass]);

  return (
    <div className="currentGrades__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Предмет</th>
            <th>Текущие оценки</th>
            <th>Средний балл</th>
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
                    {finalGrade[item] && finalGrade[item][currentQuarter - 1]
                      ? finalGrade[item][currentQuarter - 1].grades.join(', ')
                      : ''}
                  </td>
                  <td className="subject_grade-average">
                    {finalGrade[item] && finalGrade[item][currentQuarter - 1]
                      ? finalGrade[item][currentQuarter - 1].average
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
