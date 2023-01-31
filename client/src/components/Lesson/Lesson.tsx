type ILesson = {
  lesson: string;
};

const Lesson = ({ lesson }: ILesson) => {
  return <td className="schedule__lesson">{lesson}</td>;
};

export default Lesson;
