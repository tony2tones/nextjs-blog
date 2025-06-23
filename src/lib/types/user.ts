import { CloudinaryImage } from "./cloudinaryImage";

export type User = {
  id:string;
  name: string;
  email: string;
  image?: CloudinaryImage | null;
};