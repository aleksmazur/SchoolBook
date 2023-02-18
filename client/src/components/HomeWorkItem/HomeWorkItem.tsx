import { useState } from 'react';
import { InputHomeWork } from '../InputHomeWork/InputHomeWork';
import { getDate } from '../PupilsInJournal/PupilsInJornal';
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
      <td>{getDate(date)}</td>
      {isInput ? (
        <td className="cell__homework-active">
          <InputHomeWork setIsInput={setIsInput} idLesson={id} homeWork={homework} />
        </td>
      ) : (
        <td className="cell__homework" onClick={() => setIsInput(true)}>
          <div>{homework}</div>
          <div></div>
        </td>
      )}
    </tr>
  );
};

export default HomeWorkItem;
