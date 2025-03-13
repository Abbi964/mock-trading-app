import { Request } from "express";
import { decodeToken } from "../../helper/token.helper";

type UserInfo =  {
    email: string,
    userId: string
}

export const context = async ({ req }: { req: Request }): Promise<unknown> => {
    const token = req.headers["authorization"];;
    const {email,userId}:UserInfo = decodeToken(token)
    const context = {
        email,
        userId
    };
    return context;
};
