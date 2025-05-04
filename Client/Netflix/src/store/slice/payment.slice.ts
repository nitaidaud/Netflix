import { capturePaymentRequest } from "./../../api/api";
import { checkPayment, createPaymentIntentRequest } from "@/api/api";
import ICreatePaymentData from "@/api/interfaces/payment/ICreatePaymentData";
import { Plan } from "@/data/plans";
import { getErrorMessage } from "@/utils/axios.error.handler";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  selectedPlan: Plan | null;
  orderStatus: "pending" | "success" | "failed" | null;
  hasPayment: boolean;
  isLoading: boolean;
}

const initialState: PaymentState = {
  selectedPlan: null,
  hasPayment: false,
  isLoading: false,
  orderStatus: null,
};

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (paymentData: ICreatePaymentData, { rejectWithValue }) => {
    try {
      const { message, success, order } = await createPaymentIntentRequest(
        paymentData,
      );
      if (!order || !success) {
        return rejectWithValue(message);
      }

      return {
        orderId: order.orderId,
        approvalLink: order.approvalLink,
        success,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkUserPayment = createAsyncThunk(
  "payment/checkUserPayment",
  async (_, { rejectWithValue }) => {
    try {
      const { paymentStatus } = await checkPayment();
      return {
        hasPayment: paymentStatus.hasPayment,
        orderStatus: paymentStatus.orderStatus,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const capturePayment = createAsyncThunk(
  "payment/capturePayment",
  async (_, { rejectWithValue }) => {
    try {
      const { success } = await capturePaymentRequest();
      return {
        success,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedPlanId: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.hasPayment = false;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.hasPayment = false
        state.isLoading = false;
        state.orderStatus = "pending";
      })
      .addCase(createPayment.rejected, (state) => {
        state.isLoading = false;
        state.hasPayment = false;
        state.orderStatus = "failed";
      })
      .addCase(checkUserPayment.pending, (state) => {
        state.isLoading = true;
        state.hasPayment = false;
      })
      .addCase(checkUserPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasPayment = action.payload.hasPayment;
        state.orderStatus = action.payload.orderStatus;
      })
      .addCase(checkUserPayment.rejected, (state) => {
        state.isLoading = false;
        state.hasPayment = false;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.hasPayment = false;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasPayment = action.payload.success;
        state.orderStatus = "success";
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
        state.hasPayment = false;
      });
  },
});

export const { setSelectedPlanId } = paymentSlice.actions;
export default paymentSlice.reducer;
