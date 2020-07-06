import axios from "axios";
import {GET_BACKLOG, GET_ERRORS} from "./types";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projects/${backlogId}`);
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