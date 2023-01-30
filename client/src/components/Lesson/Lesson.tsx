type ILesson = {
  lesson: string;
};

const Lesson = ({ lesson }: ILesson) => {
  return <div className="schedule__lesson">{lesson}</div>;
};

export default Lesson;
