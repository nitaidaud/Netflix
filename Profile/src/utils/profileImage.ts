import TOKENS from "../../tokens";

function chooseProfileImage(file: Express.Multer.File | undefined): string {
  let imageUrl = "";
  if (file) {
    const cleanFileName = file.filename.replace(/\s/g, "_").toLowerCase();

    imageUrl = `${TOKENS.BaseImageUrl}/api/profiles/uploads/profiles/${cleanFileName}`;
  } else {
    imageUrl = `${TOKENS.BaseImageUrl}/api/profiles/uploads/profiles/default-profile.jpg`;
  }
  return imageUrl;
}

export default chooseProfileImage;
