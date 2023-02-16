/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { IUserFromToken } from '../components/Header/Header';
import { authUser, getChildrenByParent, getUserById } from '../thunks/user';
import jwt_decode from 'jwt-decode';

type IClass = {
  id: number;
  className: string;
  classTeacherId: number;
};

export type IChildren = {
  adress: string;
  birthday: string;
  class: IClass;
  classId: number;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
  fullName: string;
  parentId: number;
};

type IUserInfo = {
  id: string | null;
  username: string | null;
  fullName: string | null;
  role: string | null;
  children: IChildren[] | null;
  profilePic: string | null;
  gender: string | null;
};

export type IUserState = {
  token: {
    token: string | null;
  };
  userInfo: IUserInfo;
  errorUser: string | null | undefined;
};

const initialState: IUserState = {
  token: {
    token: null,
  },
  userInfo: {
    id: null,
    username: null,
    fullName: null,
    role: null,
    children: null,
    profilePic: null,
    gender: null,
  },
  errorUser: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo.username = action.payload.username;
      state.userInfo.fullName = action.payload.fullName;
    },
    setServiceInfo(state, action) {
      const decodedToken: IUserFromToken = jwt_decode(action.payload);
      state.userInfo.id = decodedToken.id;
      state.userInfo.role = decodedToken.role[0].value;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, () => {
        //preloader
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload.token);
        state.errorUser = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.errorUser = action.error.message;
      })
      .addCase(getChildrenByParent.fulfilled, (state, action) => {
        state.userInfo.children = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userInfo.profilePic = action.payload.profilePic;
        state.userInfo.gender = action.payload.gender;
      });
    // .addCase(authUser.rejected, (state, action) => {
    //error
    // });
  },
});

export default userReducer.reducer;
export const { setUserInfo, setServiceInfo, setToken } = userReducer.actions;
