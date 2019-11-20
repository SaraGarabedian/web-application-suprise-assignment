import Api from "./Api";

class CommentsApi {
    getAllComments() {
        return Api.get('/comments');
    }

    getCommentsById(id) {
        return Api.get('/comments?postId='+id);
    }

    createComment(postId, comment) {
        return Api.post('/posts/' + postId + '/comments', comment);
    }

    updateComment(comment) {
        return Api.put('/comments', comment);
    }

    deleteComment(id) {
        return Api.delete('/comments/'+id);
    } 
}

export default new CommentsApi();