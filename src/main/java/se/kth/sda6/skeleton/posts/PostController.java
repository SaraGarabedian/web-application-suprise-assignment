package se.kth.sda6.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda6.skeleton.auth.IAuthenticationFacade;
import se.kth.sda6.skeleton.user.UserService;

import java.util.List;

/*
    @TODO AutoWire PostService and create the methods needed to implement the API.
    Don't forget to add necessary annotations.
 */
@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<Post> getAll() {
        return postService.getAll();
    }

    @GetMapping("/{id}")
    public Post getById(@PathVariable Long id) {
        return postService.getByID(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public Post create(@RequestBody Post newPost) {
        String currentUserEmail = authenticationFacade.getAuthentication().getName();
        newPost.setUsername(userService.getUserByEmail(currentUserEmail).get().getName());
        return postService.save(newPost);
    }

    @PutMapping("")
    public Post update(@RequestBody Post updatedPost) {
        return postService.update(updatedPost)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        String currentUserEmail = authenticationFacade.getAuthentication().getName();
        String userName = userService.getUserByEmail(currentUserEmail).get().getName();
        if(!postService.deleteById(id, userName)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(null);
    }
}
