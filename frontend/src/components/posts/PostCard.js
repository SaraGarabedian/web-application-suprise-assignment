import React, { Component } from "react";
import CommentsApi from "./../../api/CommentsApi";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";

class PostCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
        }
    }

    async createComment(commentData) {
        try {
            const response = await CommentsApi.createComment(commentData);
            const comment = response.data;
            const newComments = this.state.comments.concat(comment);

            this.setState({
                comments: newComments,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async deleteComment({id}) {
        try {
            await CommentsApi.deleteComment(id);
            const newComments = this.state.comments.filter(c => c.id !== id);
            this.setState({
                comments: newComments,
            });
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        CommentsApi.getAllComments()
            .then(({ data }) => this.setState({ comments: data }))
            .catch(err => console.error(err));
    }

    render(){
        const commentsByPost = this.state.comments
                                .filter(comment => comment.post !== null)
                                .filter(({post:{id}}) => (id !== null && id === this.props.post.id));

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
                            <span className="badge badge-info">{commentsByPost.length}</span>{" "}
                            Comment{commentsByPost.length > 0 ? "s" : ""}
                    </button>
                    </p>
                    <button className="btn btn-outline-danger" onClick={this.props.onDeleteClick}>Delete</button>
                    <button type="button"
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={'#write-comment' + this.props.post.id}> Comment
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
                        {commentsByPost
                            .map(( {id, body, username}) => (
                                <Comment key={id}
                                body={body}
                                username={username}
                                onDeleteClick={() => this.deleteComment({id})}
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