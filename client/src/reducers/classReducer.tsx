import { createSlice } from '@reduxjs/toolkit';
import { IChildren } from './userReducer';
import { getClassByID } from '../thunks/classes';
import { getChildrenById } from '../thunks/user';

type ITeacher = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

type IPupil = {
  id: number | null;
  className: string | null;
  firstName: string | null;
  adress: string | null;
  birthday: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  parents: [{ fullName: string | null }];
};

export type IClass = {
  classInfo: {
    id: number | null;
    className: string | null;
    classTeacherId: number | null;
    classTeacher: ITeacher | null;
    childrens: IChildren[] | [];
  };
  currentPupil: IPupil;
};

const initialState: IClass = {
  classInfo: {
    id: null,
    className: null,
    classTeacherId: null,
    classTeacher: null,
    childrens: [],
  },
  currentPupil: {
    id: null,
    className: null,
    firstName: null,
    adress: null,
    birthday: null,
    lastName: null,
    middleName: null,
    fullName: null,
    parents: [{ fullName: null }],
  },
};

const classReducer = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassByID.pending, () => {
        //preloader
      })
      .addCase(getClassByID.fulfilled, (state, action) => {
        state.classInfo = action.payload;
      })
      .addCase(getChildrenById.fulfilled, (state, action) => {
        state.currentPupil = action.payload;
        state.currentPupil.parents = action.payload.parents;
      });
  },
});

export default classReducer.reducer;
export const {} = classReducer.actions;
