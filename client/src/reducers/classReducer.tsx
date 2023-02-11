import { createSlice } from '@reduxjs/toolkit';
import { IChildren } from './userReducer';
import { getClassByID, getClassByIDTeacher } from '../thunks/classes';
import { getChildrenById } from '../thunks/user';

export type ITeacher = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePic: string;
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
  profilePic: string | null;
  isLoading: boolean;
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
    profilePic: null,
    isLoading: false,
  },
};

const classReducer = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassByID.pending, () => {
        // preloader
      })
      .addCase(getClassByID.fulfilled, (state, action) => {
        state.classInfo = action.payload;
      })
      .addCase(getClassByIDTeacher.pending, () => {
        // preloader
      })
      .addCase(getClassByIDTeacher.fulfilled, (state, action) => {
        // удалить [0]
        state.classInfo = action.payload[0];
      })
      .addCase(getChildrenById.pending, (state) => {
        state.currentPupil.isLoading = true;
      })
      .addCase(getChildrenById.fulfilled, (state, action) => {
        state.currentPupil = action.payload;
        state.currentPupil.parents = action.payload.parents;
        state.currentPupil.isLoading = false;
      });
  },
});

export default classReducer.reducer;
export const {} = classReducer.actions;
