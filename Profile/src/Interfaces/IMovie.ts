import { Genre } from "@prisma/client";

export default interface IMovie{
    name: string;
        id: string;
        image: string;
        userId: string | null;
        genre: Genre[];
        adult: boolean;
        time: Date;
        backdrop_path: string;
        profileId: string | null;
}