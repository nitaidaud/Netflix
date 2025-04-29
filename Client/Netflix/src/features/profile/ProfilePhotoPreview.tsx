
interface ProfilePhotoPreviewProps {
  imageSrc: string;
}

const ProfilePhotoPreview = ({ imageSrc }: ProfilePhotoPreviewProps) => {
  return (
    <div className="text-center">
      <img
        src={imageSrc}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-red-600"
      />
    </div>
  );
};

export default ProfilePhotoPreview;
