import { v4 as uuid } from "uuid";
import { prisma } from "../../prisma/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1;

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};

const getVerificationTokenByEmail = (email: string) => {
  try {
    const verificationToken = prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};

export const getVerificationTokenByID = (id: string) => {
    try {
      const verificationToken = prisma.verificationToken.findFirst({
        where: {
          id,
        },
      });
      return verificationToken;
    } catch (error) {
      console.error(error);
    }
  };