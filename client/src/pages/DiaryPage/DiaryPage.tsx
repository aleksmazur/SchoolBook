import DiaryDay from '../../components/DiaryDay/DiaryDay';
import { getMonth } from '../../helpers/dataHelper';
import { setEndWeek, setStartWeek } from '../../reducers/scheduleReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './diary.css';

export const schedule = [
  ['математика', 'русский', 'труд'],
  ['литература', 'белорусский', 'физкультура'],
  ['литература', 'математика', 'физкультура'],
  ['литература', 'изо', 'физкультура'],
  ['литература', 'труд', 'физкультура'],
  ['', '', ''],
];

const DiaryPage = () => {
  const dispatch = useAppDispatch();
  const startWeek = useAppSelector((state) => state.schedule.startWeek);
  const endWeek = useAppSelector((state) => state.schedule.endWeek);

  const onChangeWeekNext = () => {
    dispatch(setStartWeek(startWeek + 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek + 24 * 60 * 60 * 1000 * 7));
  };

  const onChangeWeekPrev = () => {
    dispatch(setStartWeek(startWeek - 24 * 60 * 60 * 1000 * 7));
    dispatch(setEndWeek(endWeek - 24 * 60 * 60 * 1000 * 7));
  };

  const renderShedule = () => {
    return (
      <div className="diary__list">
        {schedule.map((lessons, index) => {
          return <DiaryDay lessons={lessons} key={index} index={index}></DiaryDay>;
        })}
      </div>
    );
  };

  return (
    <div>
      <h3>Дневник</h3>
      <div className="week__control">
        <div onClick={() => onChangeWeekPrev()} className="arrow">
          &#8592;
        </div>
        <div>
          {new Date(startWeek).getDate()}, {getMonth(new Date(startWeek).getMonth())}{' '}
          {new Date(startWeek).getFullYear()}
          {' - '}
          {new Date(endWeek).getDate()}, {getMonth(new Date(endWeek).getMonth())}{' '}
          {new Date(endWeek).getFullYear()}
        </div>
        <div onClick={() => onChangeWeekNext()} className="arrow">
          &#8594;
        </div>
      </div>
      <div>{renderShedule()}</div>
    </div>
  );
};

export default DiaryPage;
