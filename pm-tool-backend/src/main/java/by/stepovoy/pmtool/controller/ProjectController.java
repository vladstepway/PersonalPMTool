package by.stepovoy.pmtool.controller;

import by.stepovoy.pmtool.domain.Project;
import by.stepovoy.pmtool.service.ProjectService;
import by.stepovoy.pmtool.service.ValidationErrorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final ValidationErrorService validationErrorService;

    public ProjectController(ProjectService projectService, ValidationErrorService validationErrorService) {
        this.projectService = projectService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping("")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult result) {

        ResponseEntity<?> errorMap = validationErrorService.validate(result);
        if (errorMap != null) {
            return errorMap;
        }

        Project project1 = projectService.saveOrUpdate(project);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }
}
