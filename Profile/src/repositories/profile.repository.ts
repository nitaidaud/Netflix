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
      include: {
        moviesFavoriteList: {
          include: {
            movies: true,
          },
        },
      },
    });

    return profile;
  }

  async createProfile(
    profileData: IProfilePayload,
    userId: string,
  ): Promise<IProfile> {
    const newProfile = await prisma.profile.create({
      data: { ...profileData, userId },
      include: {
        moviesFavoriteList: {
          include: {
            movies: true,
          },
        },
      },
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
      include: {
        moviesFavoriteList: {
          include: {
            movies: true,
          },
        },
      },
    });

    return updatedProfile;
  }

  async addMovieToFavoriteList(
    profileId: string,
    movieData: IMovie,
  ): Promise<boolean> {
    const favList = await prisma.movieFavoriteList.upsert({
      where: { profileId },
      update: {
        movies: {
          connectOrCreate: {
            where: { id: movieData.id },
            create: movieData,
          },
        },
      },
      create: {
        profileId,
        movies: {
          connectOrCreate: {
            where: { id: movieData.id },
            create: movieData,
          },
        },
      },
    });

    return !!favList;
  }

  async removeMovieFromFavoriteList(
    profileId: string,
    movieId: string,
  ): Promise<boolean> {
    const deletedMovie = await prisma.movieFavoriteList.update({
      where: { profileId },
      data: {
        movies: {
          disconnect: { id: movieId },
        },
      },
    });

    return !!deletedMovie;
  }

  async deleteProfile(profileId: string): Promise<boolean> {
    const deletedProfile = await prisma.profile.delete({
      where: { id: profileId },
    });

    return !!deletedProfile;
  }

  async getAllProfiles(userId: string): Promise<IProfile[]> {
    const profiles = await prisma.profile.findMany({
      include: {
        moviesFavoriteList: {
          include: {
            movies: true,
          },
        },
      },
      where: { userId },
    });

    return profiles.length > 0 ? profiles : [];
  }
}
