import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { checkUserPayment } from "@/store/slice/payment.slice";

export const useCheckUserPayment = (userId: string | null | undefined) => {
  const dispatch = useAppDispatch();
  const hasPayment = useAppSelector((state) => state.payment.hasPayment);
  const loading = useAppSelector((state) => state.payment.loading);

  useEffect(() => {
    if (userId) {
      dispatch(checkUserPayment(userId));
    }
  }, [dispatch, userId]);

  return { hasPayment, loading };
};
