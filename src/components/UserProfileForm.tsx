'use client'
import { useState } from "react"
import ImageUploader from "@/components/ImageUploader"

type CloudinaryImage = {
  publicId: string;
  version: string;
  format: string;
  imageId: string;
  userId: string;
};

type User = {
  id:string;
  name: string;
  email: string;
  image?: CloudinaryImage| null;
};

export default function UserProfileForm({user}:{user: User} ) {
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [userForm, setUserForm] = useState<User>(user);
  const  [message, setMessage] = useState('');

  const handleFileChange = (file:File| null) => {
    setMessage("")
    setImageSelected(file);
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e?.target;
    e.preventDefault();
    setUserForm(((prev) => ({
      ...prev,
      [name]: value,
    })))
  }

  const getImageUrl = (image?: CloudinaryImage | null): string | null => {
  if (!image) return null;
  const cloud_name = 'dcbvbkyjc';
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${image.version}/${image.publicId}.${image.format}`;
};


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!imageSelected) {
        setMessage('Please select an image to upload');
        return;
    }
    const formData = new FormData();

    formData.append('image',imageSelected);
    formData.append('userId',user.id);

    const res = await fetch('/api/image-upload', {
      method:'POST',
      body: formData
    })

    const response = await res.json();
      setUserForm((prev) => ({
        ...prev,
        image: response.imageUrl, // ✅ Save the Cloudinary URL
      }));
    console.log('Response in user form', response)
    if(response) {
      setMessage('image uploaded')
    }

  }
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input 
        type='text' 
        placeholder="name"
        name="name"
        value={userForm.name}
        onChange={handleInputChange}
        required
        />
          <input 
        type='email' 
        placeholder="email" 
        name="email"
        value={userForm.email}
        onChange={handleInputChange}
        required
        />
      
    <ImageUploader onImageChange={handleFileChange} initialImage={getImageUrl(userForm.image) || null} />
    <button type="submit">Update</button>
    </form>
    {message}
    </>
  )
}