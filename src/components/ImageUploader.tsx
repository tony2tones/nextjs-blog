// 'use client';
import { useState, useEffect } from "react"
import Image from 'next/image'
// import { CldUploadButton } from 'next-cloudinary';

type ImageUploaderProps = {
  onImageChange : (file:File | null) => void;
  initialImage?: string | { publicId: string; version: string; format: string } | null;
}

export default function ImageUploader({onImageChange, initialImage}:ImageUploaderProps) {
  const [previewUrl,setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
  if (initialImage && typeof initialImage === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { publicId, version, format } = initialImage as any;
    // const cloudName = "dcbvbkyjc"; // <- your Cloudinary cloud name
    const constructedUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_fill/v${version}/${publicId}.${format}`;
    setPreviewUrl(constructedUrl);
  } else if (typeof initialImage === "string") {
    setPreviewUrl(initialImage);
  }
}, [initialImage]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file)
    } else {
      setPreviewUrl(null);
      onImageChange(null);
    }
  }
  return (
    <div>
      <label htmlFor="image">Upload image</label>
      <input 
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        />
        {previewUrl && (
          <Image
            src={previewUrl}  
            alt="preview"
            width={250}
            height={250}
          />
        )}
        {/* <CldUploadButton uploadPreset="<Upload Preset>" onClick={handleFileChange} /> */}
    </div>

  )
}