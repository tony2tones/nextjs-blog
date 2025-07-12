
export type CloudinaryImage = {
  publicId: string;
  version: string;
  format: string;
  imageId: string;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image?: CloudinaryImage|null;
};