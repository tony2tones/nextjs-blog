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



  const handleInput = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(null);
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
      setNewPost({
        title: '',
        post: '',
      })
    } else {
      setMessage('Failed to upload blog post')
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3 px-4">
      <div className="justify-center"><h1>Add a post</h1></div>
    <form onSubmit={handleFormSubmit} className="p-8 border-2 border-amber-50 rounded-md w-full flex flex-col h-full max-w-md min-h-96">
    <div className="flex flex-col gap-3 py-2 px-2 m-2 flex-grow">
      <label htmlFor="title">Title:</label>
      <input 
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
        id="post" 
        name="post" 
        placeholder="Enter a post"
        required
        value={newPost.post}
        onChange={handleInput} />
    </div>
    {message && <p className="p-4">{message}</p>}
    <button type="submit">Save post</button>
    </form>
    </div>
  )
}