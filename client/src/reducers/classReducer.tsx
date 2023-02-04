import { createSlice } from '@reduxjs/toolkit';
import { IChildren } from './userReducer';
import { getClassByID } from '../thunks/classes';

type ITeacher = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type IClass = {
  classInfo: {
    id: number | null;
    className: string | null;
    classTeacherId: number | null;
    classTeacher: ITeacher | null;
    childrens: IChildren[] | [];
  };
};

const initialState: IClass = {
  classInfo: {
    id: null,
    className: null,
    classTeacherId: null,
    classTeacher: null,
    childrens: [],
  },
};

const classReducer = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassByID.pending, (state, action) => {
        //preloader
      })
      .addCase(getClassByID.fulfilled, (state, action) => {
        state.classInfo = action.payload;
      });
  },
});

export default classReducer.reducer;
export const {} = classReducer.actions;
