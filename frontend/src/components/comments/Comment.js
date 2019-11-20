import React from "react"
/*
const Comment = ({ name, message, time }) =>
  (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{time}</small>
        <h6 className="mt-0 mb-1 text-muted">{name}</h6>
        {message}
      </div>
    </div>
  ) */

  const Comment = ({ id, body, postId }) =>
  (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        {body}
      </div>
    </div>
  )

export default Comment