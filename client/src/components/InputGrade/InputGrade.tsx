import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import './inputGrade.css';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
};

export const InputGrade = ({ setIsInput }: IProps) => {
  const [valueGrade, setNewGrade] = useState<string>('');

  const updateGrade = async () => {
    const newGrade = {
      value: valueGrade,
    };
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
        /*         placeholder={grade} */
        onChange={(e) => handleChange(e)}
        value={valueGrade}
      />
      <div className="apply__icon" onClick={updateGrade}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};
