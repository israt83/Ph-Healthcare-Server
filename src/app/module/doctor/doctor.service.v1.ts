/*
1.Search
2.Filtering
3.Sorting
4.Pagination

5.include => Related data (e.g., specialties, user information)
6.Fields select => Select specific columns
7.meta =>  Total count, total pages, current page, items per page

** searching & filtering
- searching = partial match (e.g., name contains "Cardio")
- filtering = exact match (e.g., specialty = "Cardiology")

*/
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type QueryParams = {
  // reserve keywords for  use
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  fields?: string;

  // filterable fields
  gender?: string;
  experience?: string;

  // any other dynamic fields
  [key: string]: unknown;
};

const getAllDoctors = async (query: QueryParams) => {
  // step 1 => pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // step 2 => sorting
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  // eslint-disable-next-line no-useless-assignment
  let orderBy = {};

  if (sortBy.includes(".")) {
    // nested object sorting
    // const [parent , child] = sortBy.split('.')
    const [relation, field] = sortBy.split(".") as [string, string];
    orderBy = {
      [relation]: {
        [field]: sortOrder,
      },
    };
  } else {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }

  //step 3 => searching

  const searchConditions: Prisma.DoctorWhereInput[] = [];
  const searchableFields = [
    "name",
    "email",
    "qualification",
    "designation",
    "currentWorkingPlace",
    "registrationNumber",
  ];

  if (query.searchTerm) {
    const searchTerm = query.searchTerm;
    // searchConditions.push(
    //   {
    //     name: { contains: searchTerm, mode: "insensitive" },
    //   },
    //   {
    //     email: { contains: searchTerm, mode: "insensitive" },
    //   },
    //   {
    //     qualification: { contains: searchTerm, mode: "insensitive" },
    //   },
    //   {
    //     designation: { contains: searchTerm, mode: "insensitive" },
    //   },
    //   {
    //     currentWorkingPlace: { contains: searchTerm, mode: "insensitive" },
    //   },
    //   {
    //     registrationNumber: { contains: searchTerm, mode: "insensitive" },
    //   }
    // );

    searchableFields.forEach((field) => {
      searchConditions.push({
        [field]: { contains: searchTerm, mode: "insensitive" },
      });
    });

    searchConditions.push({
        specialties :{
            some :{
                specialty :{
                    title : { contains : searchTerm , mode : "insensitive"}
                }
            }
        }
    })
}


  //step 4 => filtering

  const doctors = await prisma.doctor.findMany({
    // where :{
    //     OR : searchConditions.length > 0 ? searchConditions : undefined,
    // },
    where: {
      ...(searchConditions.length > 0 && {
        OR: searchConditions,
      }),
    },
    skip,
    take: limit,
    orderBy,
    include: {
      user: true,
      specialties : true
    },
    // orderBy :{
    //     //** 1 layer sorting
    //     // "name" : "asc"

    //     //** 2 layer sorting
    //     // "user" :{
    //     //     "name" : "asc"
    //     // }

    //     //** dynamic sorting
    //     // [sortBy] : sortOrder

    // }
  });
  return {
    data: doctors,
    meta: {
      page,
      limit,
      total: doctors.length,
      totalPages: Math.ceil(doctors.length / limit),
    },
  };
};

export const DoctorServiceV1 = {
  getAllDoctors,
};
