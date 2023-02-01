import { createSlice } from '@reduxjs/toolkit';

type ISettingState = {
  settingStatus: boolean;
};

const initialState: ISettingState = {
  settingStatus: false,
};

const settingReduser = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSettingStatus: (state) => {
      state.settingStatus = !state.settingStatus;
    },
  },
});

export const { setSettingStatus } = settingReduser.actions;
export default settingReduser.reducer;
