import { useEffect, useState } from 'react';
import { ISubjects } from '../../reducers/subjectsReducer';
import { IChildren } from '../../reducers/userReducer';
import { useAppSelector } from '../../store/hooks';
import { IHomeWork } from '../HomeWorkInJournal/HomeWorkInJournal';
import PupilItem from '../PupilItem/PupilItem';

const PupilsInJornal = ({ nameLesson, quarter, idClass }: IHomeWork) => {
  const childrens = useAppSelector((state) => state.classInfo.classInfo.childrens);
  const subjects = useAppSelector((state) => state.subjects.subjects);
  const [filtersSubject, setFiltersSubject] = useState<ISubjects[]>([]);
  console.log('filtersSubject: ', filtersSubject);

  useEffect(() => {
    const res = subjects
      .filter((item) => item.name === nameLesson)
      .filter((item) => item.quarter.quarter === quarter)
      .filter((item) => item.classId === idClass)
      .sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
    console.log('res: ', res);
    setFiltersSubject(res);
  }, [subjects, nameLesson, quarter, idClass]);

  const getDate = (date: string): string => {
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

  return (
    <div className="pupilsList__table">
      <table>
        <thead>
          <tr>
            <th>Даты</th>
            <th>ФИО</th>
            {filtersSubject.map((sub, ind) => (
              <th key={ind}>{getDate(sub.date)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {childrens
            ? childrens.map((pupil: IChildren, ind: number) => {
                return (
                  <PupilItem
                    key={ind}
                    num={ind}
                    id={pupil.id}
                    fullName={pupil.fullName}
                    diary={true}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default PupilsInJornal;
