import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccountFormProps {
  onSubmit: () => void;
}

const AccountForm = ({ onSubmit }: AccountFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-left w-full max-w-md mx-auto"
    >
      <div className="flex flex-col gap-1">
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="bg-neutral-900 border border-gray-600 placeholder-gray-500 text-white px-4 py-3 rounded text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          id="password"
          type="password"
          placeholder="Add a password"
          className="bg-neutral-900 border border-gray-600 placeholder-gray-500 text-white px-4 py-3 rounded text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="updates"
          type="checkbox"
          className="accent-red-600 w-4 h-4"
        />
        <label htmlFor="updates" className="text-xs text-gray-300">
          Email me with special offers from Netflix
        </label>
      </div>
      <Button
        type="submit"
        className="mt-6 w-full text-lg py-5 bg-red-600 hover:bg-red-800"
      >
        Next
      </Button>
    </form>
  );
};

export default AccountForm;
