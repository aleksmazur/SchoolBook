export type ISсheduleDay = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  classId: number;
};

export type ISсhedule = {
  [day: string]: ISсheduleDay[];
};
