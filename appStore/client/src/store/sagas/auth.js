import { put } from 'redux-saga/effects';
import axios from 'axios';

import authService from '../../api/authService';
import * as actions from '../actions/index';

const api = axios.create({
        baseURL: 'https://loja-lisboa.herokuapp.com/users',
        'Content-Type': 'application/json',
    });

export function* logoutSaga(action) {
    authService.logout();
    yield put(actions.logoutSucceed());
}

export function* registerUserSaga(action) {
    yield put(actions.signupStart()); 
    try {
        const authData = {
            username: action.username,
            email: action.email,
            password: action.password
        };

        let url = '/signup';
        yield api.post(url, authData)
                .then(response => console.log(response));
    } catch(err) {
        console.log(err);
    }
}

export function* loginUserSaga(action) {
    yield put(actions.authStart());
    const loginData = {
        username: action.username,
        password: action.password
    };

    let url = '/login';
    
    try{
        yield api.post(url, loginData)
                .then(res => {
                    authService.setLocalStorage(res.data);
                    const headers = {"Authorization" : `${res.data.token}`}
                    window.location.assign('/', {headers});
                })
                .catch(err => console.log(err));
        
        const token = yield localStorage.getItem('token');
        const userId = yield localStorage.getItem('userId');
        yield put(actions.authSuccess(token, userId));
                // if(res.data.isAdmin) {
                //     actions.adminSuccess(res.data.token, res.data.user._id);
                // }
               
            
        } catch(error) {
                console.log('not possible to login: ' + error);
                yield put(actions.authFail('not possible to login!'));
            }                    
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if(!token) {
        yield put(actions.logout());
    }
    const userId = localStorage.getItem('userId');
    if(!userId) {
        yield put(actions.logout());
    }

    yield put(actions.authSuccess(token, userId));
}