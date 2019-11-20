package se.kth.sda6.skeleton.posts;

import org.hibernate.validator.constraints.Length;
import se.kth.sda6.skeleton.comments.Comment;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;


// @TODO add Hibernate annotations to define which table and columns should be used to save the Post Object.
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @NotEmpty(message = "Please write something")
    @Length(min = 2, max=100, message = "Post length most be between 2-100 characters")
    @Column(name = "post_body")
    private String body;

//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
//    private List<Comment> comments = new ArrayList<>();

    @Column(name = "author")
    private String username;

    public Post() {
    }

    public Post(String body) {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

//    public void addComment(Comment comment) {
//        comments.add( comment );
//        comment.setPost( this );
//    }
//
//    public void removeComment(Comment comment) {
//        comments.remove( comment );
//        comment.setPost( null );
//    }
}
