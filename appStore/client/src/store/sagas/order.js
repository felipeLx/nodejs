import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';


const api = axios.create({
    baseURL: 'https://loja-lisboa.herokuapp.com/orders',
    'Content-Type': 'application/json',
});

const token = localStorage.getItem('token');
api.defaults.headers.common['Authorization'] = `${token}`;

export function* purchaseProductSaga(action) {
    yield put( actions.purchaseProductStart() );

    try{
        yield api.post( '/', action.orderData );
        yield put(actions.addItemToOrder( action.orderData ));
        } catch(error)  {
                yield put( actions.purchaseProductFail( error ) );
        } 
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const userId = localStorage.getItem('userId');
        try{
            const response = yield api.get(`/${userId}` );
            yield put(actions.fetchOrdersSuccess(response.data.order));
        } catch(error) {
            yield put(actions.fetchOrdersFail(error));
          }
}

export function* editOrConfirmOrderSaga(action) {
    yield put( actions.editOrderStart() );

    const userId = localStorage.getItem('userId');
    try{
        yield api.put( `/${userId}`, action.orderData );
        yield put(actions.editOrdersSuccess( action.orderData ));
        } catch(error)  {
                yield put( actions.editOrdersFail( error ) );
        } 
}

// export function* editOrConfirmAddressSaga(action) {
//     yield put( actions.editOrderStart() );
//     console.log(action);
//     let address = [...action.orderData.address];
//     console.log(address);
//     const userId = localStorage.getItem('userId');
//     // try{
//     //     yield api.put( `/${userId}`, action.orderData );
//     //     yield put(actions.editOrdersSuccess( action.orderData ));
//     //     } catch(error)  {
//     //             yield put( actions.editOrdersFail( error ) );
//     //     } 
// }

export function* deleteOrderSaga(action) {
    const userId = localStorage.getItem('userId');
    
    try{
        yield api.delete( `/${userId}`, {data: {id: action.id, qty: action.qty, productId: action.productId}} );       
        } catch(error)  {
                yield put( actions.editOrdersFail( error ) );
        } 
}