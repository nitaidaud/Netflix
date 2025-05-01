import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  selectedMovieId: number | null;
  selectedTVShowId: number | null;
  selectedSeasonNumber: number;
}

const initialState: ModalState = {
  selectedMovieId: null,
  selectedTVShowId: null,
  selectedSeasonNumber: 1,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMovieModal: (state, action: PayloadAction<number>) => {
      state.selectedMovieId = action.payload;
    },
    openTVShowModal: (state, action: PayloadAction<number>) => {
      state.selectedTVShowId = action.payload;
    },
    closeModal: (state) => {
      state.selectedMovieId = null;
      state.selectedTVShowId = null;
      state.selectedSeasonNumber = 1;
    },
    setSelectedSeasonNumber: (state, action: PayloadAction<number>) => {
      state.selectedSeasonNumber = action.payload;
    },
  },
});

export const { openMovieModal, closeModal, openTVShowModal } =
  modalSlice.actions;
export default modalSlice.reducer;
