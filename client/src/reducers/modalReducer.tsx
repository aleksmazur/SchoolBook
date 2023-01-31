import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  activeModal: boolean;
}

const initialState: IModalState = {
  activeModal: false,
};

const modalReduser = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleActiveModal: (state) => {
      state.activeModal = !state.activeModal;
    },
  },
});

export const { toggleActiveModal } = modalReduser.actions;
export default modalReduser.reducer;
