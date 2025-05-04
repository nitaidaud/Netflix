import { injectable } from "inversify";
import { prisma } from "../../prisma/prisma";
import ProfileDTO from "../DTOs/profile.dto";
import IFavoriteList from "../Interfaces/IFavoriteList";
import IMovie from "../Interfaces/IMovie";
import IProfile from "../Interfaces/IProfile";
import IProfileData from "../Interfaces/IProfilePayload";
import IProfileRepository from "../Interfaces/IProfileRepository";

@injectable()
export class ProfileRepository implements IProfileRepository {
  async getProfileById(profileId: string): Promise<ProfileDTO | null> {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: {
        image: true,
        name: true,
        favoriteList: {
          include: {
            favoriteList: true,
          },
        },
      },
    });

    return profile;
  }

  async getProfileByName(profileName: string): Promise<ProfileDTO | null> {
    const profile = await prisma.profile.findUnique({
      where: { name: profileName },
      include: {
        favoriteList: {
          include: {
            favoriteList: true,
          },
        },
      },
    });

    return profile;
  }

  async createProfile(
    profileData: IProfileData,
    userId: string,
  ): Promise<IProfile> {
    const newProfile = await prisma.profile.create({
      data: { ...profileData, userId },
      select: {
        id: true,
        image: true,
        name: true,
        favoriteList: {
          include: {
            favoriteList: true,
          },
        },
      },
    });

    return newProfile;
  }

  async updateProfile(
    profileId: string,
    profileData: IProfileData,
  ): Promise<ProfileDTO | null> {
    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: profileData,
      include: {
        favoriteList: {
          include: {
            favoriteList: true,
          },
        },
      },
    });

    return updatedProfile;
  }

  async addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<IFavoriteList> {
    const favList = await prisma.favoriteList.upsert({
      where: { profileId },
      update: {
        favoriteList: {
          connectOrCreate: {
            where: { id: movieData.id },
            create: movieData,
          },
        },
      },
      create: {
        profileId,
        favoriteList: {
          connectOrCreate: {
            where: { id: movieData.id },
            create: movieData,
          },
        },
      },
      include: {
        favoriteList: true,
      },
    });

    return favList;
  }

  async removeMovieFromFavoriteList(
    profileId: string,
    movieId: number,
  ): Promise<IFavoriteList> {
    const deletedMovie = await prisma.favoriteList.update({
      where: { profileId },
      data: {
        favoriteList: {
          disconnect: { id: movieId },
        },
      },
      include: {
        favoriteList: true,
      },
    });

    return deletedMovie;
  }

  async getMyList(profileId: string): Promise<IFavoriteList | null> {
    const myList = await prisma.favoriteList.findUnique({
      where: { profileId },
      include: {
        favoriteList: true,
      },
    });

    return myList;
  }

  async deleteProfile(profileName: string): Promise<boolean> {
    const deletedProfile = await prisma.profile.delete({
      where: { name: profileName },
    });

    return !!deletedProfile;
  }

  async getAllProfiles(userId: string): Promise<ProfileDTO[]> {
    const profiles = await prisma.profile.findMany({
      include: {
        favoriteList: {
          include: {
            favoriteList: true,
          },
        },
      },
      where: { userId },
    });

    return profiles.length > 0 ? profiles : [];
  }
}
