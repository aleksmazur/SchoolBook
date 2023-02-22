import { createSlice } from '@reduxjs/toolkit';
import { getSchoolInfo } from '../thunks/school';

export type ISchoolInfo = {
  schoolInfo: {
    id: number | null;
    name: string | null;
    location: string | null;
    adress: string | null;
    phone: string | null;
    mail: string | null;
  };
};

const initialState: ISchoolInfo = {
  schoolInfo: {
    id: null,
    name: null,
    location: null,
    adress: null,
    phone: null,
    mail: null,
  },
};

const schoolReducer = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolInfo.pending, () => {
        // preloader
      })
      .addCase(getSchoolInfo.fulfilled, (state, action) => {
        state.schoolInfo = action.payload;
      });
  },
});

export default schoolReducer.reducer;
export const {} = schoolReducer.actions;
