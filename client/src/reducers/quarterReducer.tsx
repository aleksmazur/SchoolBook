/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getQuarter } from '../thunks/quarter';

export type IQuarter = {
  id: number | null;
  quarter: number | null;
  startDate: string;
  endDate: string;
  subjects: [];
};
export type IQuarterState = {
  currentQuarter: number;
  activeQuarter: number;
  quarter: IQuarter[];
};

const initialState: IQuarterState = {
  currentQuarter: 3,
  activeQuarter: 3,
  quarter: [],
};

const quarterReducer = createSlice({
  name: 'quarter',
  initialState,
  reducers: {
    setCurrentQuarter(state, action) {
      state.currentQuarter = action.payload;
    },
    setActiveQuarter(state, action) {
      state.activeQuarter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuarter.pending, () => {
        //preloader
      })
      .addCase(getQuarter.fulfilled, (state, action) => {
        state.quarter = action.payload;
      });
  },
});

export default quarterReducer.reducer;
export const { setCurrentQuarter, setActiveQuarter } = quarterReducer.actions;
