import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpeciality = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialityService.createSpeciality(req.body);
  sendResponse(
    res,
    {
      httpStatusCode: 200,
      success: true,
      message: "Speciality created successfully",
      data: result,
    },
  )
});

const getSpeciality = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialityService.getSpeciality();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Speciality fetched successfully",
    data: result,
  });
});

const updateSpeciality = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialityService.updateSpeciality(
    id as string,
    req.body,
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Speciality updated successfully",
    data: result,
  });
});

const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialityService.deleteSpeciality(id as string);
  sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Speciality deleted successfully",
      data: result
  })
});
export const SpecialityController = {
  createSpeciality,
  getSpeciality,
  updateSpeciality,
  deleteSpeciality,
};
