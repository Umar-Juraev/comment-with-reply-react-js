import React, { useState, useEffect } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../../api/api";
import Comment from "../Comment/Comment";
import CommentsForm from "../CommentsForm/CommentsForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log(text, parentId);
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("are  you sure that  you want remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const undatedBackendComment = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );

        setBackendComments(undatedBackendComment);
      });
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const undatedBackendComment = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return {
            ...backendComment,
            body: text,
          };
        }
        return backendComments;
      });
      setBackendComments(undatedBackendComment)
      setActiveComment(null)
    });
  };

  useEffect(() => {
    getCommentsApi().then((data) => setBackendComments(data));
  }, []);

  return (
    <div>
      <h3>Comments</h3>

      <div>Write comment</div>
      <CommentsForm submitLabel="Write" handleSubmit={addComment} />
      <div>
        {rootComments.map((rootComment) => {
          return (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              activeComment={activeComment}
              updateComment={updateComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
