import { VerificationToken } from "@prisma/client";
import IBaseToken from "./IBaseToken";

export default interface ITokenRepository {
  generate(data: IBaseToken): Promise<VerificationToken>;
  findById(id: string): Promise<VerificationToken | null>;
  findByEmail(email: string): Promise<VerificationToken | null>;
  delete(id: string): Promise<void>;
}
