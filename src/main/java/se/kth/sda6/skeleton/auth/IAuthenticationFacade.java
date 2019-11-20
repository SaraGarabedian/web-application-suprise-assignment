package se.kth.sda6.skeleton.auth;

import org.springframework.security.core.Authentication;

public interface IAuthenticationFacade {
        Authentication getAuthentication();
}
