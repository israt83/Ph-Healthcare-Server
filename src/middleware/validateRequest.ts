import z from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (zodSchema: z.ZodObject) =>{
    return (req: Request, res: Response, next: NextFunction) => {

    const parseResult = zodSchema.safeParse(req.body);
    if (!parseResult.success) {
         next(parseResult.error);
    }
    req.body = parseResult.data;

    next();

    }

}