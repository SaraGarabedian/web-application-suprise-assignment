import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) =>
  (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-info">{comments.length}</span>{" "}
        Comment{comments.length > 0 ? "s" : ""}
      </h5>

      {comments.map(({id, name, message, time}) => (
        <Comment key={id} name={name} message={message} time={time} />
      ))}
    </div>
  )

export default CommentList;