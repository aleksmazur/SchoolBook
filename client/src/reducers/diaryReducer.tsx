import { createSlice } from '@reduxjs/toolkit';
import { getDiary } from '../thunks/diary';

type IDiary = {
  [key: string]: IDiaryDay[];
};

export type IDiaryDay = {
  classId: number;
  date: string;
  endTime: string;
  grade: number | null;
  homework: string;
  id: number;
  name: string;
  startTime: string;
};

export type IDiaryState = {
  diary: IDiary | null;
  week: number;
  year: number;
};

const initialState: IDiaryState = {
  diary: null,
  week: 0,
  year: 2023,
};

const diaryReducer = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setWeek(state, action) {
      state.week = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiary.pending, () => {
        //preloader
      })
      .addCase(getDiary.fulfilled, (state, action) => {
        state.diary = action.payload;
      });
  },
});

export default diaryReducer.reducer;
export const { setWeek, setYear } = diaryReducer.actions;
