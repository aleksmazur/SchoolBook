import { createSlice } from '@reduxjs/toolkit';
import { IShedule } from '../interfaces/IShedule';
import { getSchedule } from '../thunks/schedule';

export type IScheduleState = {
  schedule: IShedule | null;
};

const initialState: IScheduleState = {
  schedule: null,
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
      });
  },
});

export default scheduleReducer.reducer;
