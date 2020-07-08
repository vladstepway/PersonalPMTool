package by.stepovoy.pmtool.controller;

import by.stepovoy.pmtool.domain.User;
import by.stepovoy.pmtool.service.UserService;
import by.stepovoy.pmtool.service.ValidationErrorService;
import by.stepovoy.pmtool.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final ValidationErrorService validationErrorService;
    private final UserValidator userValidator;

    public UserController(UserService userService, ValidationErrorService validationErrorService, UserValidator userValidator) {
        this.userService = userService;
        this.validationErrorService = validationErrorService;
        this.userValidator = userValidator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
//        validate password matching
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationErrorService.validate(result);
        if (errorMap != null) {
            return errorMap;
        }

        User newUser = userService.saveUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

}
