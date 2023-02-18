import { ChangeEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISubjects } from '../../reducers/subjectsReducer';
import './pupilItemInJournal.css';
import { updateGrade } from '../../thunks/grades';
import { getSubject } from '../../thunks/subject';

type IPropsPupil = {
  num: number;
  id: number;
  fullName: string;
};

export type IOptions = {
  pupilId: number;
  subjectId: number;
};

export type INewGrade = {
  value: string | null;
  childrenId: number;
  subjectId: number;
};

const PupilItemInJournal = ({ num, id, fullName }: IPropsPupil) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((state) => state.subjects.subjects);
  const activeQuarter = useAppSelector((state) => state.quarter.activeQuarter);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const subject = useAppSelector((state) => state.subjects.subjects);

  const handleReset = async (e: MouseEvent<HTMLInputElement>) => {
    const currentCell = e.target as HTMLInputElement;
    const currentCellOptions = currentCell.getAttribute('data-cell')?.split('_') as string[];
    await dispatch(
      updateGrade({
        value: '0', // изменить на null
        childrenId: +currentCellOptions[0],
        subjectId: +currentCellOptions[1],
      })
    );
    const nameLesson = subject.filter((item) => item.id === +currentCellOptions[1])[0].name;
    if (idClass) {
      dispatch(getSubject({ nameLesson, activeQuarter, idClass }));
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const currentCell = e.target as HTMLInputElement;
    const currentCellOptions = currentCell.getAttribute('data-cell')?.split('_') as string[];
    await dispatch(
      updateGrade({
        value: e.target.value,
        childrenId: +currentCellOptions[0],
        subjectId: +currentCellOptions[1],
      })
    );
    const nameLesson = subject.filter((item) => item.id === +currentCellOptions[1])[0].name;
    if (idClass) {
      dispatch(getSubject({ nameLesson, activeQuarter, idClass }));
    }
  };

  const showClue = (e: MouseEvent<HTMLInputElement>) => {
    const currentCell = e.target as HTMLInputElement;
    const clue = currentCell.nextSibling as HTMLSpanElement;
    if (currentCell.value) clue.style.opacity = '1';
  };

  const hideClue = (e: MouseEvent<HTMLInputElement>) => {
    const currentCell = e.target as HTMLInputElement;
    const clue = currentCell.nextSibling as HTMLSpanElement;
    clue.style.opacity = '0';
  };

  return (
    <>
      <tr>
        <td className="pupil__item_id">{num + 1}. </td>
        <td className="pupil__item_name" onClick={() => navigate(`/class/children/${id}`)}>
          <Link to={`/class/children/${id}`}>{fullName}</Link>
        </td>
        {subjects &&
          subjects.map((subject: ISubjects, index: number) => {
            const currentMark: number | null | undefined = subject.grades.find(
              (el) => el.childrenId === id
            )?.value;
            return (
              <td className="cell__grade" key={index}>
                <input
                  className="input__grade"
                  type="text"
                  onMouseOver={(e) => showClue(e)}
                  onMouseOut={(e) => hideClue(e)}
                  onClick={(e) => handleReset(e)}
                  onChange={(e) => handleChange(e)}
                  value={currentMark ? String(currentMark) : ''}
                  data-cell={`${id}_${subject.id}`}
                />
                <span className="grade__clue">Кликните по ячейке для удаления оценки</span>
              </td>
            );
          })}
      </tr>
    </>
  );
};

export default PupilItemInJournal;
