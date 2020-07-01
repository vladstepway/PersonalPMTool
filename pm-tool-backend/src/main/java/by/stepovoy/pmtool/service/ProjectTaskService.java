package by.stepovoy.pmtool.service;

import by.stepovoy.pmtool.domain.Backlog;
import by.stepovoy.pmtool.domain.ProjectTask;
import by.stepovoy.pmtool.repository.BacklogRepository;
import by.stepovoy.pmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    private final BacklogRepository backlogRepository;
    private final ProjectTaskRepository projectTaskRepository;

    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //all PTs to be added to a specific project -> project!= null -> BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        //set the BL to PT
        projectTask.setBacklog(backlog);
        //project sequence should be like : IDPRO-1 IDPRO-2
        Integer backlogSequence = backlog.getPTSequence();
        //update the BL sequence
        backlog.setPTSequence(++backlogSequence);
        //Add seq to project task
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        //initial priority when priority null
        if (projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }
        //initial status when status null
        if (projectTask.getStatus() == null || "".equals(projectTask.getStatus())) {
            projectTask.setStatus("TO-DO");
        }
        return projectTaskRepository.save(projectTask);
    }
}
