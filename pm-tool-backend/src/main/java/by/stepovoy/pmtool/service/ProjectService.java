package by.stepovoy.pmtool.service;

import by.stepovoy.pmtool.domain.Project;
import by.stepovoy.pmtool.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }
}
