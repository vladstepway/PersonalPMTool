import axios from "axios";
import {GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK} from "./types";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/project-board/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
}

export const getBacklog = (backlogId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjectTask = (backlogId, projectTaskId, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}/${projectTaskId}`)
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        })
    } catch (err) {
        history.push("/dashboard");
    }
}

export const updateProjectTask = (backlogId, projectTaskId, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${projectTaskId}`, projectTask)
        history.push(`/project-board/${backlogId}`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}