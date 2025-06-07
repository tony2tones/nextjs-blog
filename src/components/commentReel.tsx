

type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
  };
};

type CommentProps = {
  comments: CommentWithUser[];
}

export default function CommentReel({comments}:CommentProps) {
return (
  <div>
  {comments.map((comment => (
  <div key={comment.id}>
    <p>{comment.user.name}: {comment.content}</p>
  </div>
  )))}
  </div>
  )
}