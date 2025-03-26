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
    <form onSubmit={handleFormSubmit}>
    <div>
      <input 
        type="text" 
        id="title"
        name="title"
        value={newPost.title}
        placeholder="Title"
        required
        onChange={handleInput} />
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
  )
}