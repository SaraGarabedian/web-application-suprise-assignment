package se.kth.sda6.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda6.skeleton.auth.IAuthenticationFacade;
import se.kth.sda6.skeleton.posts.Post;
import se.kth.sda6.skeleton.posts.PostService;
import se.kth.sda6.skeleton.user.UserService;

import java.util.List;

@RestController
public class CommentController {

    private CommentService commentService;
    private PostService postService;

    @Autowired
    private IAuthenticationFacade authenticationFacade;
    @Autowired
    private UserService userService;

    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    @GetMapping("/comments")
    public ResponseEntity<?> getAllCommentsOnPost(@RequestParam Long postId) {
        Post post = postService.getByID(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find post with id " + postId.toString()));
        List<Comment> comments = commentService.getAllByPost(post);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") Long id) {
        String currentUserEmail = authenticationFacade.getAuthentication().getName();
        String userName = userService.getUserByEmail(currentUserEmail).get().getName();
        if(!commentService.deleteById(id, userName)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping("posts/{id}/comments")
    public ResponseEntity<?> postComment(@RequestBody Comment comment, @PathVariable("id") Long postId) {
        Post post = postService.getByID(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find post with id " + postId.toString()));
        String currentUserEmail = authenticationFacade.getAuthentication().getName();
        comment.setUsername(userService.getUserByEmail(currentUserEmail).get().getName());
        Comment savedComment = commentService.save(comment, post);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }
}
