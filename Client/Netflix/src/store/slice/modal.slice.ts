import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  selectedMovieId: number | null;
}

const initialState: ModalState = {
  selectedMovieId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<number>) => {
      state.selectedMovieId = action.payload;
    },
    closeModal: (state) => {
      state.selectedMovieId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
