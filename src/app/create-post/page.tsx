'use client'
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/action";
import { useState, ChangeEvent } from "react";
import toast from 'react-hot-toast';

type NewPost = {
  title:string;
  content:string;
};

export default function CreatePost() {
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleInput = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;
    setMessage(null);
    setNewPost({
      ...newPost,
      [ name]: value,
    })
  }

  const handleCreatePost = async (formData: FormData) => {
    const response = await createPost(formData);
    if (response.success) {
      toast('Blog post has been successfully created!');
      setNewPost({
        title: '',
        content: '',
      });
    } else {
      setMessage(response.error || 'Failed to upload blog post');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 px-4">
      <div className="justify-center"><h1>Add a post</h1></div>
    <form action={handleCreatePost} className="p-8 border-2 border-amber-50 rounded-md w-full flex flex-col h-full max-w-md min-h-96">
    <div className="flex flex-col gap-3 py-2 px-2 m-2 flex-grow">
      <label htmlFor="title">Title:</label>
      <Input 
      className="border "
        type="text" 
        id="title"
        name="title"
        value={newPost.title}
        placeholder="Enter a Title"
        required
        onChange={handleInput} />
        <label htmlFor="post">Post:</label>
      <textarea 
        className="p-2 border rounded-md w-full"
        id="content" 
        name="content" 
        placeholder="Add your idea to share"
        required
        value={newPost.content}
        onChange={handleInput} />
    </div>
    {message && <p className="p-4">{message}</p>}
    <button type="submit">Save and share your idea</button>
    </form>
    </div>
  )
}