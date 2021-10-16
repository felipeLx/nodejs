import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const adminSuccess = (token,userId) => {
    return {
        type: actionTypes.ADMIN_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authSuccess =  (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {type: actionTypes.AUTH_LOGOUT};
};

export const login = (username, password) => {
    return {
        type: actionTypes.AUTH_USER,
        username: username,
        password: password,
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};

export const signup = (username, email, password) => {
    return {
        type: actionTypes.SIGNUP_USER,
        username: username,
        email: email,
        password: password
    }
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};