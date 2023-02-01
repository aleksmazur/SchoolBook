import { createSlice } from '@reduxjs/toolkit';
// import { authUser } from '../thunks/user';

export type IUserState = {
  token: {
    token: string | null;
  };
  userInfo: {
    id: string | null;
    login: string | null;
    password: string | null;
    name?: string | null;
    role: string | null;
  };
};

const initialState: IUserState = {
  token: {
    token: null,
  },
  userInfo: {
    id: null,
    login: null,
    password: null,
    name: null,
    role: null,
  },
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo.login = action.payload.login;
      state.userInfo.password = action.payload.password;
      state.userInfo.id = action.payload.id;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(authUser.pending, (state, action) => {
  //         //preloader
  //       })
  //       .addCase(authUser.fulfilled, (state, action) => {
  //         state.token = action.payload;
  //         localStorage.setItem('token', action.payload.token);
  //       })
  //       .addCase(authUser.rejected, (state, action) => {
  //         //error
  //       });
  //   },
});

export default userReducer.reducer;
export const { setUserInfo, setToken } = userReducer.actions;
