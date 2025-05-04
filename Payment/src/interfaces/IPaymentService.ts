export default interface IPaymentService {
  createPayment(input: {
    userId: string;
    plan: "Basic" | "Standard" | "Premium";
    price: number;
    currency: string;
  }): Promise<{ orderId: string; approvalLink: string }>;

  capturePayment(orderId: string): Promise<void>;

  checkPayment(userId: string): Promise<{orderStatus: "pending" | "success" | "failed" | null, hasPayment: boolean}>;
}
