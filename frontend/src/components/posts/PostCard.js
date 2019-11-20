import React, { useState } from "react"
import CommentsPage from "../comments/CommentsPage"


function PostCard({ post, onDeleteClick }) {
    const [isShowingComments, setShowingComments] = useState(false)
    return (
        <div className="card mt-3">
            <div className="card-body">
                <p>
                    {post.body}
                </p>
                <button className="btn btn-outline-danger" onClick={onDeleteClick}>Delete</button>
                <button type="button"
                    className="btn btn-link"
                    onClick={() => setShowingComments(!isShowingComments)}>Comments</button>
                {isShowingComments ?
                    <React.Fragment>
                        <CommentsPage postId={post.id}/>
                    </React.Fragment>
                    : null}
            </div>
        </div>
    );
}

export default PostCard