import Api from "./Api";

class CommentsApi {
    getAllComments() {
        return Api.get('/comments');
    }

    getCommentsById(id) {
        return Api.get('/comments/'+id); //need to change the path
    }

    createComment(comment) {
        return Api.post('/comments', comment);
    }

    updateComment(comment) {
        return Api.put('/comments', comment);
    }

    deleteComment(id) {
        return Api.delete('/comments/'+id);
    } 
}

export default new CommentsApi();