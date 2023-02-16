import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import './inputGrade.css';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
  idPupil: number;
};

export const InputGrade = ({ setIsInput, idPupil }: IProps) => {
  const [valueGrade, setNewGrade] = useState<string>('');

  const updateGrade = async () => {
    /*  const newGrade = {
      value: valueGrade,
      childrenId: 1,
      /subjectId: idLesson, 
    };*/
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
        data-idpupil={idPupil}
      />
      <div className="apply__icon" onClick={updateGrade}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};
