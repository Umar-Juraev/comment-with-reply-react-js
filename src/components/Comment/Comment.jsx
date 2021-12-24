import React from "react";
import { Flex } from "../../assets/style/GlobalStyles";
import CommentsForm from "../CommentsForm/CommentsForm";
import { Avatar } from "./StyledComment";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  updateComment,
  addComment,
  parentId = null,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <Flex align="flex-start" gap="20px" margin=" 0 0 10px 0">
      <Avatar></Avatar>

      <div>
        <Flex gap="20">
          <div>{comment.username}</div>
          <div>{createdAt}</div>
        </Flex>

        {!isEditing && <div>{comment.body}</div>}
        {isEditing && (
          <CommentsForm
            submitLabel={"update"}
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={()=>setActiveComment(null)}
          />
        )}

        <Flex gap="10px" margin=" 0 0  20px 0">
          {canReply && (
            <button
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "replying",
                })
              }
            >
              Reply
            </button>
          )}
          {canEdit && (
            <button
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "editing",
                })
              }
            >
              edit
            </button>
          )}
          {canDelete && (
            <button onClick={() => deleteComment(comment.id)}>delete</button>
          )}
        </Flex>

        {isReplying && (
          <CommentsForm
            submitLabel={"Reply"}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div style={{ margin: " 0 0 0 50px" }}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                parentId={comment.id}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </div>
    </Flex>
  );
};

export default Comment;
