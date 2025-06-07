'use client'
import { useState } from "react";

type AddCommentProps = {
  postId: string;
};

const AddComment = ({postId}: AddCommentProps) => {
  const [comment, setComment] = useState('')

  function handleCommentInput(e:React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value)
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
      setComment('');


    } catch (error) {
      console.log(error)

    }

    }
    return (
      <div>
        <h3>Add comment?</h3>
        <textarea 
          className="p-2 border rounded" 
          id="comment" 
          name="comment" 
          value={comment} 
          placeholder="Add a comment " 
          onChange={() => handleCommentInput}
          />
        <button type="submit" onClick={postComment}>Add comment</button>
      </div>
    )
  }

export default AddComment;