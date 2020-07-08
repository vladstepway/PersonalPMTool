package by.stepovoy.pmtool.service;

import by.stepovoy.pmtool.domain.User;
import by.stepovoy.pmtool.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        //Username has to be unique

        //Make sure that password confirmed

        //dont persist or show confirm password

        return userRepository.save(newUser);
    }
}
