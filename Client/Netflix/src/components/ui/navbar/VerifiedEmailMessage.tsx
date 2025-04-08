import Typography from "@/components/shared/Typography";
import { X } from "lucide-react";
import { useState } from "react";

type VerifiedEmailMessageProps = {
  message: string | null;
};

const VerifiedEmailMessage = ({ message }: VerifiedEmailMessageProps) => {
  const [showMsg, setShowMsg] = useState<boolean>(true);

  return showMsg ? (
    <div className="flex justify-center items-center p-2 rounded-md mb-4 relative bg-green-600/40">
      <Typography>{message}</Typography>
      <X className="absolute right-3" onClick={() => setShowMsg(false)} />
    </div>
  ) : null;
};

export default VerifiedEmailMessage;
