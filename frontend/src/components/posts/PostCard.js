import React, { Component } from "react";
import CommentsApi from "./../../api/CommentsApi";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";

class PostCard extends Component {

    async createComment(commentData) {
        try {
            const response = await CommentsApi.createComment(commentData);
            const comment = response.data;
            const newComments = this.props.comments.concat(comment);
            this.props.updateParentState(newComments);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteComment(id) {
        try {
            await CommentsApi.deleteComment(id);
            const newComments = this.props.comments.filter(c => c.id !== id);
            this.props.updateParentState(newComments);
        } catch (e) {
            console.error(e);
        }
    }

    render(){
        return (
            <div className="card mt-3">
                <div className="card-body">
                <h6 className="mt-0 mb-1 text-muted">{this.props.post.username}</h6>
                    <p>
                        {this.props.post.body}
                    </p>
                    <p>
                    <button type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={'#show-comment' + this.props.post.id}>
                            <span className="badge badge-info">{this.props.comments.length}</span>{" "}
                            Comment{this.props.comments.length > 0 ? "s" : ""}
                    </button>
                    </p>
                    <button className="btn btn-outline-danger" onClick={this.props.onDeletePostClick}>Delete</button>
                    <button type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={'#write-comment' + this.props.post.id}> Write a comment
                    </button>
                    <div id={'write-comment' + this.props.post.id} className="collapse">
                        <CommentForm onSubmit={({body}) => this.createComment(
                            {
                                body: body,
                                post: this.props.post,
                            }
                        )} />
                    </div >
                    <div id={'show-comment' + this.props.post.id} className="collapse">
                        {this.props.comments
                                .map(( {id, body, username}) => (
                                    <Comment key={id}
                                    body={body}
                                    username={username}
                                    onDeleteCommentClick={() => this.deleteComment(id)}
                                        />
                        ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PostCard;