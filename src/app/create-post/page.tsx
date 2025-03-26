'use client'
import { useState, ChangeEvent, FormEvent } from "react";

type NewPost = {
  title:string;
  post:string;
};

export default function CreatePost() {
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    post: '',
  });
  const [message, setMessage] = useState<string | null>(null);



  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
    setNewPost({
      ...newPost,
      [ e.target.name]: e.target.value,
    })
  }

  const handleFormSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/create-post', {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify(newPost)
    })


    if(response.ok) {
      setMessage('Blog post has been successfully added!')
    } else {
      setMessage('Failed to upload blog post')
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center  gap-3">
    <form onSubmit={handleFormSubmit} className="p-8 border-2 border-amber-50 rounded-md">
    <div className="flex flex-col gap-3 py-2 px-2 m-2">
      <label htmlFor="title">Title:</label>
      <input 
        type="text" 
        id="title"
        name="title"
        value={newPost.title}
        placeholder="Enter a Title"
        required
        onChange={handleInput} />
        <label htmlFor="post">Post:</label>
      <input 
        type="text" 
        id="post" 
        name="post" 
        placeholder="Post"
        required
        value={newPost.post}
        onChange={handleInput} />
    </div>
    <button type="submit">Save post</button>
    {message && <p>{message}</p>}
    </form>
    </div>
  )
}