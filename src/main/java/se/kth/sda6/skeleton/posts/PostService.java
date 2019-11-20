package se.kth.sda6.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    @TODO Autowire the PostRepository and use it to implement all the service methods.
 */
@Service
public class PostService {
    @Autowired
    private PostRepository repository;

    public List<Post> getAll() {
        return repository.findAll().stream().collect(Collectors.toList());
    }

    public Optional<Post> getByID(Long id) {
        return repository.findById(id);
    }

    public Post save(Post post) {
        return repository.save(post);
    }

    public Optional<Post> update(Post post) {
        return Optional.of(repository.save(post));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
