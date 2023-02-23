import { createSlice } from '@reduxjs/toolkit';
import { deleteGrade, updateGrade } from '../thunks/grades';

type IGrades = {
  isLoader: boolean;
};

const initialState: IGrades = {
  isLoader: false,
};

const gradesReducer = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGrade.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(updateGrade.fulfilled, (state) => {
        state.isLoader = false;
      })
      .addCase(updateGrade.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(deleteGrade.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(deleteGrade.fulfilled, (state) => {
        state.isLoader = false;
      })
      .addCase(deleteGrade.rejected, (state) => {
        state.isLoader = true;
      });
  },
});

export default gradesReducer.reducer;
export const {} = gradesReducer.actions;
