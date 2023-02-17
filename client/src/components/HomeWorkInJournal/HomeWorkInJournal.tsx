/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { ISubjects } from '../../reducers/subjectsReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSubject } from '../../thunks/subject';
import HomeWorkItem from '../HomeWorkItem/HomeWorkItem';
import Preloader from '../Preloader/Preloader';

export type IHomeWork = {
  filtersSubject: ISubjects[];
};

const HomeWorkInJournal = ({ filtersSubject }: IHomeWork) => {
  const dispatch = useAppDispatch();
  const { isLoader } = useAppSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(getSubject());
  }, [dispatch]);

  return (
    <div className="homeWorkList__table">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Домашнее задание</th>
            <th>Задать домашнее задание</th>
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
        </tbody>
      </table>
    </div>
  );
};

export default HomeWorkInJournal;
