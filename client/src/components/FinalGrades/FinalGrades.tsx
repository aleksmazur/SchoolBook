import { useAppSelector } from '../../store/hooks';
import './finalGrades.css';

const FinalGrades = () => {
  const { finalDiary } = useAppSelector((state) => state.diary);
  return (
    <div className="finalGrades__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Предмет</th>
            <th>1 четверть</th>
            <th>2 четверть</th>
            <th>3 четверть</th>
            <th>4 четверть</th>
            <th>Годовая</th>
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
                        {finalDiary[item] && finalDiary[item][quarter]
                          ? finalDiary[item][quarter].average
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
