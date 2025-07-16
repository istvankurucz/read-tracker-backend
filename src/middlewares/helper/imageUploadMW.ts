import { imageUpload } from "../../config/multer";
import parseRequestBodyMW from "./parseRequestBodyMW";

const imageUploadMW = [imageUpload.single("file"), parseRequestBodyMW];

export default imageUploadMW;
