import Container from "@/components/shared/Container";
import Typography from "@/components/shared/Typography";
import UpdateProfileForm from "@/features/profile/UpdateProfileForm";

const UpdateProfilePage = () => {
  return (
    <Container className="flex-col">
      <div className="text-center mb-6">
        <Typography size="text-2xl" weight="font-bold">
          Edit Profile
        </Typography>
        <Typography color="text-gray-300" size="text-sm">
          Update your profile information
        </Typography>
      </div>
      
      <UpdateProfileForm />
    </Container>
  );
};

export default UpdateProfilePage;