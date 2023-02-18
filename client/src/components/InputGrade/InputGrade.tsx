import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
/* import { useAppSelector } from '../../store/hooks'; */
import './inputGrade.css';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
  idPupil: number;
  idLesson: number;
  grade: number | null;
};

export const InputGrade = ({ setIsInput, idPupil, idLesson, grade }: IProps) => {
  const [valueGrade, setNewGrade] = useState<string>(grade?.toString() || ' ');
  /*   const classId = useAppSelector((state) => state.classInfo.classInfo.id);
  const { activeQuarter } = useAppSelector((state) => state.quarter); */

  const updateGrade = async () => {
    /* const newGrade = {
      value: valueGrade,
      childrenId: 1,
      subjectId: idLesson,
    }; */
    setIsInput(false);
    console.log('оценка обновлена');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGrade(e.target.value);
  };

  return (
    <div className="grade__wrapper">
      <input
        className="input__grade"
        type="text"
        onChange={(e) => handleChange(e)}
        value={valueGrade}
        /* placeholder={valueGrade} */
        data-idpupil={idPupil}
        data-idlesson={idLesson}
      />
      <div className="apply__icon" onClick={updateGrade}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};
