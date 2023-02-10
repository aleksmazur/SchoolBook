import { createSlice } from '@reduxjs/toolkit';
import { getWeekNumber } from '../helpers/dataHelper';
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
  errorDiary: string | null | undefined;
  startWeek: string | null;
  endWeek: string | null;
  isLoader: boolean;
};

const initialState: IDiaryState = {
  diary: null,
  week: getWeekNumber(),
  year: 2023,
  errorDiary: null,
  startWeek: null,
  endWeek: null,
  isLoader: false,
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
      .addCase(getDiary.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(getDiary.fulfilled, (state, action) => {
        state.diary = action.payload;
        state.startWeek = Object.keys(action.payload)[0];
        state.endWeek = Object.keys(action.payload)[Object.keys(action.payload).length - 1];
        state.errorDiary = null;
        state.isLoader = false;
      })
      .addCase(getDiary.rejected, (state, action) => {
        state.errorDiary = action.error.message;
        state.isLoader = false;
      });
  },
});

export default diaryReducer.reducer;
export const { setWeek, setYear } = diaryReducer.actions;
