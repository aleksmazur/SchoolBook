import { createSlice } from '@reduxjs/toolkit';

type ISettingState = {
  settingStatus: boolean;
  theme: string;
};

const initialState: ISettingState = {
  settingStatus: false,
  theme: 'light',
};

const settingReduser = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSettingStatus: (state) => {
      state.settingStatus = !state.settingStatus;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setSettingStatus, setTheme } = settingReduser.actions;
export default settingReduser.reducer;
