import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";


const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req.body);
  sendResponse(
    res,
    {
      httpStatusCode: 200,
      success: true,
      message: "Doctor created successfully",
      data: result,
    },
  )
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const  payload = req.body;
    const result = await userService.createAdmin(payload);
    sendResponse(res,{
        httpStatusCode : status.CREATED,
        success : true,
        message : "Admin created successfully",
        data : result
    })
})

export const userController = {
  createDoctor,
  createAdmin
};