import { useEffect, useState } from 'react';
import { ISubjects } from '../../reducers/subjectsReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSubject } from '../../thunks/subject';
import HomeWorkItem from '../HomeWorkItem/HomeWorkItem';
import Preloader from '../Preloader/Preloader';

type IHomeWork = {
  nameLesson: string;
  quarter: number;
};

const HomeWorkInJournal = ({ nameLesson, quarter }: IHomeWork) => {
  const dispatch = useAppDispatch();
  const { subjects, isLoader } = useAppSelector((state) => state.subjects);
  const [filtersSubject, setFiltersSubject] = useState<ISubjects[]>([]);

  useEffect(() => {
    dispatch(getSubject());
  }, []);

  useEffect(() => {
    const res = subjects
      .filter((item) => item.name === nameLesson)
      .filter((item) => item.quarter.quarter === quarter);
    setFiltersSubject(res);
  }, [subjects, nameLesson, quarter]);

  return (
    <div className="homeWorkList__table">
      <table>
        <thead>
          {!isLoader ? (
            <tr>
              <td>
                <Preloader />
              </td>
            </tr>
          ) : (
            filtersSubject &&
            filtersSubject.map((subject, ind) => {
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
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default HomeWorkInJournal;
