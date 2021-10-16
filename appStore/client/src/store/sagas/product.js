import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

let api = '';
const token = localStorage.getItem('token');

if(token){
    api = axios.create({
        baseURL: 'https://loja-lisboa.herokuapp.com/api',
        'Content-Type': 'application/json',
        headers: {"Authorization" : `${token}`},
    });
} else {
    api = axios.create({
        baseURL: '/api',
        'Content-Type': 'application/json',
    });
}
               
export function* initProductsSaga(action) {
    try{
        const response = yield api.get( '/api' );
        yield put(actions.setProducts(response.data));
    } catch(error) {
        yield put(actions.fetchProductsFailed());
    }
}

export function* productDetailSaga(action) {
    try{
        const response = yield api.get( `/api/${action.productId}` );
        yield put(actions.openDetail(response.data));
    } catch(error) {
        yield put(actions.fetchProductsFailed());
    }
}