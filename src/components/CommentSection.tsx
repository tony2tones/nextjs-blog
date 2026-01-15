// CommentSection.tsx (Client Component wrapper)
'use client';

import { useState } from 'react';
import CommentReel from '@/components/commentReel';
import AddComment from '@/components/addComment';
import { CloudinaryImage } from '@/lib/types/user';

type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: CloudinaryImage | null;
  };
};

export default function CommentSection({ 
  initialComments, 
  postId,
  currentUser 
}: { 
  initialComments: CommentWithUser[];
  postId: string;
  currentUser: { name: string; image?: CloudinaryImage | null };
}) {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = async (content: string) => {
    // Create optimistic comment
    const optimisticComment: CommentWithUser = {
      id: `temp-${Date.now()}`, // Temporary ID
      content,
      createdAt: new Date(),
      user: currentUser
    };

    // Instantly add to UI
    setComments(prev => [...prev, optimisticComment]);

    try {
      // Save to server in background
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const savedComment = await response.json();

      // Convert createdAt string back to Date object
      const commentWithDate: CommentWithUser = {
        ...savedComment,
        createdAt: new Date(savedComment.createdAt)
      };

      // Replace temp comment with real one (has real ID from database)
      setComments(prev =>
        prev.map(c => c.id === optimisticComment.id ? commentWithDate : c)
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      // Rollback on error
      setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
      alert('Failed to add comment');
    }
  };

  return (
    <>
      <h2>Comments:</h2>
      <CommentReel comments={comments} />
      <AddComment onSubmit={handleNewComment} />
    </>
  );
}