import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        return (
            (error.response?.data as {message: string})?.message || 
            "An Error occured"
        );
    }
    if (error instanceof Error){
        return error.message;
    }
    return "An unknown error occurred";
}