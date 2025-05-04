export default interface ICreateProfile {
  name: string;
  image: Express.Multer.File | undefined;
}
