/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getSubject } from '../thunks/subject';
import { IClass } from './classReducer';
import { IQuarter } from './quarterReducer';

export type IGrade = {
  id: number;
  value: number;
  childrenId: number;
  subjectId: number;
};

export type ISubjects = {
  class: IClass;
  classId: number;
  date: string;
  endTime: string;
  grades: IGrade[];
  homework: null | string;
  id: number;
  name: string;
  quarter: IQuarter;
  quarterId: number;
  startTime: string;
};

type ISubjectsState = {
  subjects: ISubjects[];
  isLoader: boolean;
};

const initialState: ISubjectsState = {
  subjects: [],
  isLoader: false,
};

const subjectsReducer = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubject.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(getSubject.fulfilled, (state, action) => {
        console.log('action: ', action);
        state.subjects = action.payload;
      });
  },
});

export default subjectsReducer.reducer;
