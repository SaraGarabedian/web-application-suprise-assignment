import React, { Component } from "react";
import CommentsApi from "./../../api/CommentsApi";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

class CommentsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
        };
    }

    async createComment(postId, commentData) {
        try {
            const response = await CommentsApi.createComment(postId, commentData);
            const comment = response.data;
            const newComments = this.state.comments.concat(comment);

            this.setState({
                comments: newComments,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async deleteComment(comment) {
        try {
            await CommentsApi.deleteComment(comment.id);
            const newComments = this.state.comments.filter(c => c.id !== comment.id);
            this.setState({
                comments: newComments,
            });
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        CommentsApi.getCommentsById(this.props.postId)
            .then(({ data }) => this.setState({ comments: data }))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <React.Fragment>
                <CommentForm onSubmit={(commentData) => this.createComment(this.props.postId, commentData)} />

                <CommentList
                    comments={this.state.comments}
                />
            </React.Fragment>
        );
    }
}

export default CommentsPage;