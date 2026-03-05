import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.registerPatient(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessToken(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: {
        ...rest,
        token,
        accessToken,
        refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessToken(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: " Logged in successfully",
    data: {
      ...rest,
      token,
      accessToken,
      refreshToken,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.getMe(req.user as IRequestUser)
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User fetched successfully",
        data: result
    })
})

export const AuthController = {
  registerPatient,
  loginUser,
  getMe
};
