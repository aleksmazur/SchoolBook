import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputGrade } from '../InputGrade/InputGrade';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISubjects } from '../../reducers/subjectsReducer';
import './pupilItemInJournal.css';
import { updateGrade } from '../../thunks/grades';

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
  value: string;
  childrenId: number;
  subjectId: number;
};

const PupilItemInJournal = ({ num, id, fullName }: IPropsPupil) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptionsModal] = useState({ pupilId: 0, subjectId: 0 });
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((state) => state.subjects.subjects);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentCell = e.target as HTMLElement;
    console.log(currentCell.getAttribute('data-cell'));
    const currentCellOptions = currentCell.getAttribute('data-cell')?.split('_') as string[];
    dispatch(
      updateGrade({
        value: e.target.value,
        childrenId: +currentCellOptions[0],
        subjectId: +currentCellOptions[1],
      })
    );
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
            const value = subject.grades.find((el) => el.childrenId === id)?.value;
            return (
              <td className="cell__grade" key={index}>
                <input
                  className="input__grade"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder={value ? String(value) : ''}
                  data-cell={`${id}_${subject.id}`}
                />
              </td>
            );
          })}
      </tr>
    </>
  );
};

export default PupilItemInJournal;
