import { injectable } from "inversify";
import IProfile from "../Interfaces/IProfile";
import IProfilePayload from "../Interfaces/IProfilePayload";
import IProfileRepository from "../Interfaces/IProfileRepository";
import { prisma } from "../../prisma/prisma";
import IMovie from "../Interfaces/IMovie";

@injectable()
export class ProfileRepository implements IProfileRepository {
  async getProfileById(profileId: string): Promise<IProfile | null> {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { moviesFavoriteList: true },
    });

    return profile;
  }

  async createProfile(profileData: IProfilePayload): Promise<IProfile> {
    const newProfile = await prisma.profile.create({
      data: profileData,
      include: { moviesFavoriteList: true },
    });

    return newProfile;
  }

  async updateProfile(
    profileId: string,
    profileData: IProfilePayload,
  ): Promise<IProfile | null> {
    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: profileData,
      include: { moviesFavoriteList: true },
    });

    return updatedProfile;
  }

  async addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<boolean> {
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        moviesFavoriteList: {
          connectOrCreate: {
            where: { id: movieData.id },
            create: movieData,
          },
        },
      },
    });

    return !!profile;
  }

  async removeMovieFromFavoriteList(
    profileId: string,
    movieId: string,
  ): Promise<boolean> {
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        moviesFavoriteList: { disconnect: { id: movieId } },
      },
    });

    return !!profile;
  }

  async deleteProfile(profileId: string): Promise<boolean> {
    const deletedProfile = await prisma.profile.delete({
      where: { id: profileId },
    });

    return !!deletedProfile;
  }

  async getAllProfiles(userId: string): Promise<IProfile[]> {
    const profiles = await prisma.profile.findMany({
      include: { moviesFavoriteList: true },
      where: { userId },
    });

    return profiles.length > 0 ? profiles : [];
  }
}
