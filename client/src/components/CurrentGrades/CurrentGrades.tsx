import './currentGrade.css';

type IGrade = { subject: string; grades: number[] };

const grades = [
  { subject: 'Математика', grades: [5, 4, 4] },
  { subject: 'Русский язык', grades: [3, 4, 5, 3, 5] },
  { subject: 'Иностранный язык', grades: [5, 5, 5, 4] },
  { subject: 'Физкультура', grades: [5, 5, 5] },
];

const CurrentGrades = () => {
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
          {grades
            ? grades.map((grade: IGrade, ind: number) => {
                return (
                  <tr className={ind % 2 ? 'tr__honest' : 'tr__odd'} key={ind}>
                    <td className="subject_id">{ind + 1}. </td>
                    <td className="subject_name">{grade.subject}</td>
                    <td className="subject_grade">{grade.grades.join(', ')}</td>
                    <td className="subject_grade-average">
                      {(grade.grades.reduce((a, b) => a + b) / grade.grades.length).toFixed(1)}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentGrades;
