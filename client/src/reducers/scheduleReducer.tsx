import { createSlice } from '@reduxjs/toolkit';
import { ISсhedule, ISсheduleDay } from '../interfaces/ISchedule';
import { getSchedule } from '../thunks/schedule';

export type IScheduleState = {
  schedule: ISсhedule | null;
  lessonInClass: string[];
};

const initialState: IScheduleState = {
  schedule: null,
  lessonInClass: [],
};

const scheduleReducer = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, () => {
        //preloader
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
        Object.keys(action.payload).map((day) => {
          action.payload[day].map((lesson: ISсheduleDay) => {
            if (!state.lessonInClass.includes(lesson.name)) {
              state.lessonInClass.push(lesson.name);
            }
          });
        });
      });
  },
});

export default scheduleReducer.reducer;
