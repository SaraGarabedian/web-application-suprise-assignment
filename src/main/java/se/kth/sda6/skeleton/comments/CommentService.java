package se.kth.sda6.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda6.skeleton.posts.Post;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllByPost(Post post) {
        List<Comment> list = new ArrayList<>();
        commentRepository.findAllByPost(post).forEach(list::add);
        return list;
    }

    public Optional<Comment> getByID(Long id) {
        return commentRepository.findById(id);
    }

    public Comment save(Comment comment, Post post) {
        post.addComment(comment);
        return commentRepository.save(comment);
    }

    public boolean deleteById(Long id, String currentUser) {
        Comment currentComment = getByID(id).get();
        if(currentComment.getUsername().equals(currentUser)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
