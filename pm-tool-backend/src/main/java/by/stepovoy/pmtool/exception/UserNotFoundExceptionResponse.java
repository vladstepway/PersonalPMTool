package by.stepovoy.pmtool.exception;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserNotFoundExceptionResponse {
    private String userNotFound;

    public UserNotFoundExceptionResponse(String userNotFound) {
        this.userNotFound = userNotFound;
    }
}