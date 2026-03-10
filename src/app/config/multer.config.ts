import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer"

const storage = new CloudinaryStorage({
    cloudinary : cloudinaryUpload,
    params : async (req, file) => {
        const orginalName = file.originalname;
        const extension = orginalName.split('.').pop()?.toLocaleLowerCase();
    const fileNameWithoutExtension  = orginalName
    .split('.')
    .slice(0, -1).
    join('.')
    .toLocaleLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w-]+/g, '');
    const uniqueName =    Math.random().toString(36).substring(2)+
            "-"+
            Date.now()+
            "-"+
            fileNameWithoutExtension;


            const folder = extension === "pdf" ? "pdf" : "images";
            return {
                folder : `ph-healthcare/${folder}`,
                public_id : uniqueName,
                resource_type : "auto"
            }
      
       
    }
})

export const multerUpload = multer({storage})