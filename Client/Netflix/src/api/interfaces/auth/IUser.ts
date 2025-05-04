export default interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  emailVerified: boolean | null;
}
