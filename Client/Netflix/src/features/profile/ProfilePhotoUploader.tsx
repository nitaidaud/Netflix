import React from "react";
import Typography from "@/components/shared/Typography";

interface ProfileImageUploaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const ProfileImageUploader = ({ onChange, error }:ProfileImageUploaderProps) => {
  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        onChange={onChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 
                   file:rounded file:border-0 file:bg-red-600 file:text-white 
                   hover:file:bg-red-700 focus:outline-none"
      />
      
      {error && (
        <Typography color="text-red-500" size="text-sm" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default ProfileImageUploader;