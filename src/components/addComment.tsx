// AddComment.tsx
'use client';

import { useState } from 'react';

export default function AddComment({ 
  onSubmit 
}: { 
  onSubmit: (content: string) => Promise<void>;
}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    await onSubmit(content);
    setContent('');
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim() && !isSubmitting) {
        handleSubmit(e as any);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment... (Enter to submit, Shift+Enter for new line)"
        disabled={isSubmitting}
        className="w-full p-2 border rounded"
        rows={3}
      />
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}