const TOKENS = {
  IProfileService: "IProfileService",
  IProfileRepository: "IProfileRepository",
  ProfileController: "ProfileController",
  Token: "profileToken",
  BaseImageUrl:
    process.env.NODE_ENV === "production"
      ? "https://yourproductionurl.com"
      : "http://localhost:5000",
};

export default TOKENS;
