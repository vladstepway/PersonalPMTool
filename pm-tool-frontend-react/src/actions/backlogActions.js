import axios from "axios";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    await axios.post(`/api/backlog/${backlogId}`, projectTask);
    history.push(`/projects/${backlogId}`);
}

export const getProjectTasks = () => {

}