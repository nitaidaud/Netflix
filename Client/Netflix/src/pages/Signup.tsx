import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signing in with", { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-60 text-white relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')", filter: "blur(8px)" }}></div>
      <div className="relative bg-gray-900 bg-opacity-80 p-10 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email or phone number"
            className="w-full bg-gray-800 text-white border-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white border-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 font-bold">
            Sign In
          </Button>
          
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <span className="hover:underline cursor-pointer">Forgot password?</span>
          </div>
        </form>
        <p className="text-gray-400 text-sm mt-6 text-center">
          New to Netflix? <span className="text-white hover:underline cursor-pointer">Sign up now</span>.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
