package se.kth.sda6.skeleton.posts;

import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

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
