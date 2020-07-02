package by.stepovoy.pmtool.controller;

import by.stepovoy.pmtool.domain.ProjectTask;
import by.stepovoy.pmtool.service.ProjectTaskService;
import by.stepovoy.pmtool.service.ValidationErrorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    private final ProjectTaskService projectTaskService;
    private final ValidationErrorService validationErrorService;

    public BacklogController(ProjectTaskService projectTaskService,
                             ValidationErrorService validationErrorService) {
        this.projectTaskService = projectTaskService;
        this.validationErrorService = validationErrorService;
    }

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @PathVariable String backlogId) {
        ResponseEntity<?> errorMap = validationErrorService.validate(result);
        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogId, projectTask);

        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public List<ProjectTask> getProjectBacklog(@PathVariable String backlogId) {
        return projectTaskService.findBacklogById(backlogId);
    }
}
