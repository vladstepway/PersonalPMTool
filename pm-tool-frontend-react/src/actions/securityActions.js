import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import {setJWTToken} from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode"

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS, payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const login = (loginRequest) => async dispatch => {
    try {
        //1. post -> log in request
        const res = await axios.post("/api/users/login", loginRequest);
        //2. extract token from res.data
        const {token} = res.data;
        //3. store the token in the localstorage
        localStorage.setItem("jwtToken", token);
        //4. set our token in header ***
        setJWTToken(token);
        //5. decode the token on React
        const decodedToken = jwt_decode(token);
        //6. dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedToken
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const logout = () => async dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}