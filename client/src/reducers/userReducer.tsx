/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { IUserFromToken } from '../components/Header/Header';
import { authUser, getChildrenByParent } from '../thunks/user';
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
  parentId: number;
};

export type IUserState = {
  token: {
    token: string | null;
  };
  userInfo: {
    id: string | null;
    username: string | null;
    name: string | null;
    role: string | null;
    children: IChildren[] | null;
  };
};

const initialState: IUserState = {
  token: {
    token: null,
  },
  userInfo: {
    id: null,
    username: null,
    name: null,
    role: null,
    children: null,
  },
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo.username = action.payload.username;
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
      .addCase(authUser.pending, (state, action) => {
        //preloader
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(getChildrenByParent.fulfilled, (state, action) => {
        state.userInfo.children = action.payload;
      });

    // .addCase(authUser.rejected, (state, action) => {
    //error
    // });
  },
});

export default userReducer.reducer;
export const { setUserInfo, setServiceInfo, setToken } = userReducer.actions;
