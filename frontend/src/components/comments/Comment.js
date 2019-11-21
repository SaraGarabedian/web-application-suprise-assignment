import React from "react"

const Comment = ({ body, username, onDeleteClick }) =>
(
  <div className="media mb-3">
    <h6 className="mt-0 mb-1 text-muted">{username}</h6>
    <p className="media-body p-2 shadow-sm rounded bg-light border">
      {body}
    </p>
    <p>
      <button className="btn btn-outline-danger" onClick={onDeleteClick} >Delete</button>
    </p>
  </div>
)

export default Comment