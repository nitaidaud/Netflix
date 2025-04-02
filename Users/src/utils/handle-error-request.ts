import { Response } from "express"

export function handleError (res: Response, error: unknown): Response {
    if(error instanceof Error) {
        return res.status(400).json({success: false, message: error.message})
    }
    return res.status(500).json({success: false, message: "Internal Server Error" })
}