import React from "react"

const Comment = ({ body, onDeleteClick }) =>
(
  <div className="media mb-3">
    <p className="media-body p-2 shadow-sm rounded bg-light border">
      {body}
    </p>
    <p>
      <button className="btn btn-outline-danger" onClick={onDeleteClick} >Delete</button>
    </p>
  </div>
)

export default Comment