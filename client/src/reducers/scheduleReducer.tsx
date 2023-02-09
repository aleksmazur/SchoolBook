import { createSlice } from '@reduxjs/toolkit';
import { IShedule } from '../interfaces/IShedule';
import { getSchedule } from '../thunks/schedule';

export type IScheduleState = {
  todayDay: number;
  startWeek: number;
  endWeek: number;
  schedule: IShedule | null;
};

const initialState: IScheduleState = {
  todayDay: new Date().getDay(),
  startWeek:
    new Date().getDay() === 1
      ? new Date().getTime()
      : new Date().getTime() -
        (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) * 24 * 60 * 60 * 1000,
  endWeek:
    new Date().getDay() !== 0
      ? new Date().getTime() + 24 * 60 * 60 * 1000 * 6
      : new Date().getTime(),
  schedule: null,
};

const scheduleReducer = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setStartWeek(state, action) {
      state.startWeek = action.payload;
    },
    setEndWeek(state, action) {
      state.endWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, () => {
        //preloader
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
      });
  },
});

export default scheduleReducer.reducer;
export const { setStartWeek, setEndWeek } = scheduleReducer.actions;
