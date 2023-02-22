import { createSlice } from '@reduxjs/toolkit';

type IModalState = {
  activeModal: boolean;
};

const initialState: IModalState = {
  activeModal: false,
};

const modalReduser = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setStatusModal: (state, action) => {
      state.activeModal = action.payload;
    },
  },
});

export const { setStatusModal } = modalReduser.actions;
export default modalReduser.reducer;
