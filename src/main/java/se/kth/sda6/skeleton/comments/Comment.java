package se.kth.sda6.skeleton.comments;


import se.kth.sda6.skeleton.auth.AuthService;
import se.kth.sda6.skeleton.posts.Post;
import se.kth.sda6.skeleton.user.User;

import javax.persistence.*;

/**
 * Represents a comment made by a user on a post.
 */
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "body")
    private String body;

    @ManyToOne()
    private Post post;

    @Column(name = "author")
    private String username;

    public Comment() {
    }

    public Comment(String body) {
        this.body = body;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
