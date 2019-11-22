import React, { Component } from "react";
import PostsApi from "./../../api/PostsApi";
import CommentsApi from "./../../api/CommentsApi";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

class PostsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            comments: [],
        }
    }

    updateParentState(newComments){
        this.setState({
            comments: newComments,
        });
    }

    async createPost(postData) {
        try {
            const response = await PostsApi.createPost(postData);
            const post = response.data;
            const newPosts = this.state.posts.concat(post);

            this.setState({
                posts: newPosts,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async deletePost(id) {
        try {
            await PostsApi.deletePost(id);
            const newPosts = this.state.posts.filter(p => p.id !== id);
            this.setState({
                posts: newPosts,
            });
        } catch (e) {
            console.error(e);
        }
    }
    
    componentDidMount() {
        //get all posts
        PostsApi.getAllPosts()
            .then(({ data }) => this.setState({ posts: data }))
            .catch(err => console.error(err));
        
        //get all comments
        CommentsApi.getAllComments()
        .then(({ data }) => this.setState({ comments: data }))
        .catch(err => console.error(err));
    }

    render() {
        const { posts, comments } = this.state;

        return (
            <React.Fragment>
                <PostForm onSubmit={(postData) => this.createPost(postData)} />

                {posts.map(post =>
                    <PostCard
                        key={post.id}
                        post={post}
                        comments={
                            comments
                                .filter(comment => comment.post !== null)
                                .filter(({post:{id}}) => (id !== null && id === post.id))
                        }
                        onDeletePostClick={() => this.deletePost(post.id)}
                        updateParentState={this.updateParentState.bind(this)}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default PostsPage;