package by.stepovoy.pmtool.controller;

import by.stepovoy.pmtool.domain.Project;
import by.stepovoy.pmtool.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project project1 = projectService.saveOrUpdate(project);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }
}
