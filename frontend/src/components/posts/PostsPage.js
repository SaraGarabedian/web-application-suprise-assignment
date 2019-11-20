import axios from "axios";

import React from "react";
import PostsApi from "./../../api/PostsApi";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

class PostsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowingComments: false,
            posts: [],
            comments: []
        }
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

    async deletePost(post) {
        try {
            await PostsApi.deletePost(post.id);
            const newPosts = this.state.posts.filter(p => p.id !== post.id);
            this.setState({
                posts: newPosts,
            });
        } catch (e) {
            console.error(e);
        }
    }
    
    componentDidMount() {
        //PostsApi.getAllPosts()
        axios
            .get("https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10")
            .then(({ data }) => this.setState({ posts: data }))
            .catch(err => console.error(err));
    }

    render() {
        const { isShowingComments, posts } = this.state;

        return (
            <React.Fragment>
                <PostForm onSubmit={(postData) => this.createPost(postData)} />

                {posts.map(post =>
                    <PostCard
                        key={post.id}
                        post={post}
                        onDeleteClick={() => this.deletePost(post)}
                        //postComment={(message) => this.postComment(post.id, message)}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default PostsPage;