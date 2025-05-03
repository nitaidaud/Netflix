import { getUserPaymentStatus } from "@/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  selectedPlan: string | null;
  hasPayment: boolean | null;
  loading: boolean;
}

const initialState: PaymentState = {
  selectedPlan: null,
  hasPayment: null,
  loading: false,
};

export const checkUserPayment = createAsyncThunk(
  "payment/checkUserPayment",
  async (userId: string) => {
    const res = await getUserPaymentStatus(userId);
    return res.hasActiveOrder;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedPlanId: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserPayment.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.hasPayment = action.payload;
      })
      .addCase(checkUserPayment.rejected, (state) => {
        state.loading = false;
        state.hasPayment = false;
      });
  },
});

export const { setSelectedPlanId } = paymentSlice.actions;
export default paymentSlice.reducer;
