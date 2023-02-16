import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
  idLesson: number;
};

export const InputHomeWork = ({ setIsInput, idLesson }: IProps) => {
  const [valueGrade, setNewGrade] = useState<string>('');

  const updateHomeWork = async () => {
    const newHomeWork = {
      /* value: valueGrade,
      childrenId: 1,
      subjectId: idLesson, */
    };
    setIsInput(false);
    console.log('домашка обновлена');
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
        data-idlesson={idLesson}
      />
      <div className="apply__icon" onClick={updateHomeWork}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};
