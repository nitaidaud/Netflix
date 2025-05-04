import Form from "@/components/shared/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToastForm from "@/hooks/useToastify";
import { ProfileFormData, profileSchema } from "@/schemas/profile.schema";
import {
  createNewProfile,
  clearProfileErrors,
} from "@/store/slice/profile.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const defaultImageUrl = "/images/default-profile.jpg";

const CreateProfileForm = () => {
  const [preview, setPreview] = useState(defaultImageUrl);
  const {
    error: serverError,
    isSuccess,
    isProfileLoggedIn,
  } = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearProfileErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && isProfileLoggedIn && !loading) {
      navigate("/", { state: { profileCreated: true } });
    }
  }, [isSuccess, isProfileLoggedIn, loading, navigate]);

  useToastForm({
    formErrors: errors,
    serverError,
    successMessage: isSuccess ? "Successfully created profile!" : null,
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await dispatch(createNewProfile(data));
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 overflow-hidden rounded-full">
          <img
            src={preview}
            alt="Profile Preview"
            className="object-cover w-full h-full"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
        />

        <Input
          type="text"
          placeholder="Profile Name"
          className="w-full"
          {...register("name")}
        />

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
      </div>
    </Form>
  );
};

export default CreateProfileForm;
