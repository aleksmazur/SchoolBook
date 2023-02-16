import { useState } from 'react';
import { InputGrade } from '../InputGrade/InputGrade';
import './homeWorkItem.css';

type IPropsHomeWork = {
  id: number;
  date: string;
  homework: string | null;
  ind: number;
};

const HomeWorkItem = ({ id, date, homework }: IPropsHomeWork) => {
  const [isInput, setIsInput] = useState(false);

  return (
    <tr key={id} className="homeWork__item">
      <td>{date.substring(0, 10)}</td>
      <td>{homework}</td>
      {isInput ? (
        <td className="cell__grade-active">
          <InputGrade setIsInput={setIsInput} />
        </td>
      ) : (
        <td className="cell__grade" onClick={() => setIsInput(true)}>
          <div></div>
        </td>
      )}
    </tr>
  );
};

export default HomeWorkItem;
