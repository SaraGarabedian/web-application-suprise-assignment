import React from "react";
import CommentsPage from "../comments/CommentsPage";

function PostCard({post, onDeleteClick}) {
    return (
        <div className="card mt-3">
            <div className="card-body">
                <p>
                    {post.body}
                </p>
                <button type="button" className="btn btn-outline-success">Like</button>
                <button type="button" className="btn btn-outline-danger">Dislike</button>
                <button type="button" className="btn btn-link">Comments</button>
                <button className="btn btn-outline-danger" onClick={onDeleteClick}>Delete</button>
            </div>
        </div>
    );
}

export default PostCard;