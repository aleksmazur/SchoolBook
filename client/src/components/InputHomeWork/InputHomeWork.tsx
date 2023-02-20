import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateHomeWork } from '../../thunks/homeWork';
import { getSubject } from '../../thunks/subject';
import './inputHomeWork.css';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
  idLesson: number;
  homeWork: string | null;
};

export const InputHomeWork = ({ setIsInput, idLesson, homeWork }: IProps) => {
  const [valueHomeWork, setNewHomeWork] = useState<string>('');
  const subject = useAppSelector((state) => state.subjects.subjects);
  const activeQuarter = useAppSelector((state) => state.quarter.activeQuarter);
  const idClass = useAppSelector((state) => state.classInfo.classInfo.id);
  const dispatch = useAppDispatch();

  const updateWork = async () => {
    const newHomeWork = {
      homework: valueHomeWork,
    };
    setIsInput(false);
    dispatch(updateHomeWork({ idLesson, newHomeWork }));
    const nameLesson = subject.filter((item) => item.id === idLesson)[0].name;
    if (idClass) {
      dispatch(getSubject({ nameLesson, activeQuarter, idClass }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewHomeWork(e.target.value);
  };

  return (
    <div className="homework__wrapper">
      <input
        className="input__homework"
        type="text"
        onChange={(e) => handleChange(e)}
        value={valueHomeWork}
        placeholder={homeWork || ''}
        data-idlesson={idLesson}
      />
      <div className="apply__icon" onClick={updateWork}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};
