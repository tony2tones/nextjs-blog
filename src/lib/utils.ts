import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CloudinaryImage } from "@/lib/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCloudinaryImageUrl(
  image: CloudinaryImage | null | undefined,
  fallback: string = 'https://via.placeholder.com/150/cccccc/666666?text=User'
): string {
  if (!image) return fallback;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined');
    return fallback;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/v${image.version}/${image.publicId}.${image.format}`;
}
