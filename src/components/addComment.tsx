'use client'
import { useState } from "react";
import { useUser } from "@/lib/context/userContext";
import Image from 'next/image';
import toast from "react-hot-toast";

type AddCommentProps = {
  postId: string;
};

const AddComment = ({postId}: AddCommentProps) => {
  const [comment, setComment] = useState('')
  const { user } = useUser();

  function handleCommentInput(e:React.ChangeEvent< HTMLTextAreaElement>) {
    e.preventDefault();
    setComment(e.target.value)
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();

    if(!comment) {
      console.log('Please add a comment')
      return;
    }
    postComment();
  }

  async function postComment() {
    try {
      const res = await fetch('/api/add-comment',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          postId,
          content: comment
        }),
        credentials:'include'
      });
      
      if(!res.ok) {
        console.log('error')
      }
      
      const data = await res.json();
      console.log(data)
      setComment(data.content);
      if(data) {
        setComment('');
        toast.success('Comment added successfully');
        console.log('Comment added successfully');
        
      }


    } catch (error) {
      console.log(error)

    }

    }
    return (
        <form onSubmit={handleSubmit} >
      <section className="flex flex-col gap-4 p-4 border rounded-md">
        <div className="flex gap-2">
          <div className="flex justify-center items-center border-2 rounded-3xl">
            <Image 
              src={user?.image ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${user?.image?.version}/${user?.image?.publicId}.${user?.image?.format}` : '/profile_blank.png'}
              alt={'user profile image'}  
              objectFit="cover"
              className="rounded-full"
              height={200}
              width={200}
              />
          </div>
          <div>
          <h3>Add comment?</h3>
          <label htmlFor="comment" className="sr-only">Comment</label>
          <textarea 
            className="p-2 border rounded" 
            id="comment" 
            name="comment" 
            typeof="text"
            rows={3}
            cols={30}
            value={comment} 
            placeholder="Add a comment " 
            onChange={handleCommentInput}
            />
          <button type="submit">Add comment</button>
          </div>
        </div>
      </section>
        </form>
    )
  }

export default AddComment;