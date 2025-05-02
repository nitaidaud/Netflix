import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // השימוש בכפתור שלך
import StepProgressIndicator from "@/components/shared/StepProgressIndicator";

const Step1AccountSetup = () => {
  const [stepPart, setStepPart] = useState<"info" | "form">("info");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ניתן להוסיף כאן לוגיקת ולידציה בעתיד
    navigate("/payment/step-2");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {stepPart === "info" ? (
          <>
            <StepProgressIndicator step={1} total={3} />
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Create your account</h1>
            
            <p className="mb-8 text-gray-300">
              Just a few more steps and you're done! We hate paperwork too.
            </p>
            <Button onClick={() => setStepPart("form")} className="mt-8 w-full max-w-sm text-lg py-6 bg-red-600 hover:bg-red-900 transition duration-200 ease-in-out">
              Next
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Enter your details</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded bg-gray-800 text-white"
                
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 rounded bg-gray-800 text-white"
                
              />
              <Button type="submit" className="mt-4 w-full md:w-auto">
                Continue
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Step1AccountSetup;
