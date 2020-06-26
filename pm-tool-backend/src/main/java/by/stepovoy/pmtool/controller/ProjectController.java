package by.stepovoy.pmtool.controller;

import by.stepovoy.pmtool.domain.Project;
import by.stepovoy.pmtool.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult result) {

        if (result.hasErrors()) {

            Map<String,String> errorMap = new HashMap<>();
            result.getFieldErrors().forEach(e->errorMap.put(e.getField(),e.getDefaultMessage()));
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        Project project1 = projectService.saveOrUpdate(project);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }
}
