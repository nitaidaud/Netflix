// src/pages/CreateProfile.tsx
import Form from "@/components/shared/Form";
import Typography from "@/components/shared/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormData } from "@/schemas/profile.schema";
import { useState } from "react";
import { createNewProfile } from "@/store/slice/profile.slice";
import { useAppDispatch } from "@/store/store";
import { LucideLoader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultImageUrl = "/images/default-profile.jpg";

const CreateProfileForm = () => {
  const [preview, setPreview] = useState<string>(defaultImageUrl);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await dispatch(createNewProfile(data));
      navigate("/", {state: { profileCreated: true }});
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // This is key: we need to set the value in the form
      setValue("image", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <img
          src={preview || "/images/default-profile.jpg"}
          alt="Profile Preview"
          className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-red-600 flex items-center justify-center"
        />
      </div>
      <Input
        type="text"
        placeholder="Your Name"
        {...register("name")}
        error={errors.name?.message}
        className="w-full bg-transparent border border-gray-500 text-white px-4 py-3 rounded"
      />
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
      />
      {errors.image && (
        <Typography color="text-red-500" size="text-sm">
          {errors.image.message}
        </Typography>
      )}
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded"
        disabled={loading}
      >
        {loading ? (
          <LucideLoader className="animate-spin ml-2" />
        ) : (
          "Create Profile"
        )}
      </Button>
    </Form>
  );
};

export default CreateProfileForm;
