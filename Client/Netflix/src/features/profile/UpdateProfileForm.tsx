import Form from "@/components/shared/Form";
import { Button } from "@/components/ui/button";
import { ProfileFormData, profileSchema } from "@/schemas/profile.schema";
import { updateProfile } from "@/store/slice/profile.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProfileNameInput from "./ProfileNameInput";
import ProfilePhotoPreview from "./ProfilePhotoPreview";
import ProfileImageUploader from "./ProfilePhotoUploader";

const UpdateProfileForm = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>(
    profile?.image || "/images/default-profile.jpg",
  );
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
      name: profile?.name || "",
      image: undefined,
    },
  });

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

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await dispatch(updateProfile(data));
      navigate("/profiles", { state: { profileUpdated: true } });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col items-center justify-center"
    >
      {/* Photo preview at top */}
      <ProfilePhotoPreview imageSrc={preview} />

      {/* Name input in middle */}
      <ProfileNameInput register={register} error={errors.name?.message} />

      {/* File chooser at bottom */}
      <ProfileImageUploader
        onChange={handleImageChange}
        error={errors.image?.message}
      />

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded"
        disabled={loading}
      >
        {loading ? (
          <LucideLoader className="animate-spin ml-2" />
        ) : (
          "Save Changes"
        )}
      </Button>
    </Form>
  );
};

export default UpdateProfileForm;
