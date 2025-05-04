import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { capturePayment } from "@/store/slice/payment.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

const CapturePaymentPage = () => {
  const [pending, startTransition] = useTransition();
  const { hasPayment } = useAppSelector((state) => state.payment);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    startTransition(async () => {
      await dispatch(capturePayment());
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 text-center space-y-6 border border-zinc-700">
        {pending ? (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
            <Typography size="text-2xl" weight="font-bold">
              Processing payment...
            </Typography>
            <Typography color="text-zinc-400">
              Please wait while we confirm your purchase.
            </Typography>
          </>
        ) : hasPayment ? (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <Typography size="text-2xl" weight="font-bold">
              Payment Successful
            </Typography>
            <Typography color="text-zinc-400" className="text-zinc-400">
              Your plan has been activated. Enjoy streaming!
            </Typography>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white text-base font-semibold rounded-xl"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <Typography size="text-2xl" weight="font-bold">
              Payment Failed
            </Typography>
            <Typography color="text-zinc-400">
              Something went wrong. Please try again.
            </Typography>
            <Button
              className="w-full bg-zinc-700 hover:bg-zinc-600 text-white text-base font-semibold rounded-xl"
              onClick={() => navigate("/payment/step-1")}
            >
              Return to Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CapturePaymentPage;
