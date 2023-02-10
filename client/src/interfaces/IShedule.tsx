export type IScheduleDay = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  classId: number;
};

export type IShedule = {
  [day: string]: IScheduleDay[];
};
