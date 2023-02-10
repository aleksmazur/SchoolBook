import './finalGrades.css';

type IFinalGrades = {
  subject: string;
  quarterGrades: (number | null)[];
  finalGrade: number | null;
};

const grades = [
  { subject: 'Математика', quarterGrades: [5, 4, null, null], finalGrade: null },
  { subject: 'Русский язык', quarterGrades: [4, 5, null, null], finalGrade: null },
  { subject: 'Иностранный язык', quarterGrades: [5, 5, null, null], finalGrade: null },
  { subject: 'Физкультура', quarterGrades: [5, 5, null, null], finalGrade: null },
];

const FinalGrades = () => {
  return (
    <div className="currentGrades__table">
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
          {grades
            ? grades.map((grade: IFinalGrades, ind: number) => {
                return (
                  <tr className={ind % 2 ? 'tr__honest' : 'tr__odd'} key={ind}>
                    <td className="subject_id">{ind + 1}. </td>
                    <td className="subject_name">{grade.subject}</td>
                    {grade.quarterGrades.map((mark: number | null, i: number) => {
                      return (
                        <td className={`subject_grade-${i + 1}`} key={i}>
                          {mark}
                        </td>
                      );
                    })}
                    <td className="subject_finalGrade">{grade.finalGrade}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FinalGrades;
