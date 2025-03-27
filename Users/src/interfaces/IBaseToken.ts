import { VerificationToken } from "@prisma/client";

export default interface IBaseToken extends Omit<VerificationToken, 'id'> {
}