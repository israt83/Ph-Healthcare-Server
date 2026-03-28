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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllDoctors = async (query : any) => {
    console.log(query)
return {};

}

export const DoctorServiceV1 = {
    getAllDoctors
}