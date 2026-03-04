/*eslint-disable @typescript-eslint/no-explicit-any*/
import { NextFunction, Request, Response } from "express";
import { Role, userStatus } from "../../generated/prisma/enums";
import { cookieUtils } from "../utils/cookie";
import AppError from "../errorHelpers/AppError";
import status from "http-status";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth =
  (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // session token verification
      const sessionToken = cookieUtils.getCookie(
        req as any,
        "better-Auth.session_token",
      );
      if (!sessionToken) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized");
      }

      if (sessionToken) {
        const sessionExists = await prisma.session.findFirst({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: new Date(),
            },
          },
          include: {
            user: true,
          },
        });
        if (sessionExists && sessionExists.user) {
          const user = sessionExists.user;

          const now = new Date();
          const expiresAt = new Date(sessionExists.expiresAt);
          const createdAt = new Date(sessionExists.createdAt);

          const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
          const timeRemaining = expiresAt.getTime() - now.getTime();
          const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

          if (percentRemaining < 20) {
            res.setHeader("X-Session-Refresh", "true");
            res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            res.setHeader("X-Time-Remaining", timeRemaining.toString());
          }
          if(user.status === userStatus.BLOCKED || user.status === userStatus.DELETED){
            throw new AppError(status.FORBIDDEN, "Your account is blocked or deleted. Please contact support.");
          }

          if(user.isDeleted){
            throw new AppError(status.FORBIDDEN, "Your account is deleted. Please contact support.");
          }
          if(authRoles.length > 0 && !authRoles.includes((user.role))){
            throw new AppError(status.FORBIDDEN, "You are not authorized to access this resource.");
          }

          req.user = {
            userId: user.id,
            email: user.email,
            role: user.role,
          }
        }
      }

    //   access token verification
      const accessToken = cookieUtils.getCookie(req as any, "accessToken");
      if (!accessToken) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized");
        
      }
      const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

         if (!verifiedToken.success) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! Invalid access token.');
        }

        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)) {
            throw new AppError(status.FORBIDDEN, 'Forbidden access! You do not have permission to access this resource.');
        }

        next();

    } catch (error: any) {
      next(error);
    }
  };
