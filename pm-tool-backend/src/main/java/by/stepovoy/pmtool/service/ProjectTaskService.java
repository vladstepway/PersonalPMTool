package by.stepovoy.pmtool.service;

import by.stepovoy.pmtool.domain.Backlog;
import by.stepovoy.pmtool.domain.Project;
import by.stepovoy.pmtool.domain.ProjectTask;
import by.stepovoy.pmtool.exception.ProjectNotFoundException;
import by.stepovoy.pmtool.repository.BacklogRepository;
import by.stepovoy.pmtool.repository.ProjectRepository;
import by.stepovoy.pmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    private final BacklogRepository backlogRepository;
    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectRepository projectRepository;

    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectRepository projectRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectRepository = projectRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {
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
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public List<ProjectTask> findBacklogById(String projectIdentifier) {

        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' doesn't exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findPTByProjectSequence(String projectIdentifier, String projectTaskId) {

        //make sure backlog exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException(("Project ID '" + projectIdentifier + "' doesn't exist"));
        }

        //make sure project task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectTaskId);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project task '" + projectTaskId + "' not found");
        }

        //make sure project task id corresponds to right project
        if (!projectIdentifier.equals(projectTask.getProjectIdentifier())) {
            throw new ProjectNotFoundException("Project task '" + projectTaskId + "' doesn't exist in project '" + projectIdentifier + "'");
        }

        return projectTask;
    }
}
