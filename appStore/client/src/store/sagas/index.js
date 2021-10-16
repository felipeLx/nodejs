import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import { logoutSaga, authCheckStateSaga, loginUserSaga, registerUserSaga } from './auth';
import { initProductsSaga, productDetailSaga } from './product';
import { purchaseProductSaga, fetchOrdersSaga, editOrConfirmOrderSaga, deleteOrderSaga } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionType.AUTH_USER, loginUserSaga),
        takeEvery(actionType.SIGNUP_USER, registerUserSaga),
        takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)  
    ]);
}

export function* watchProduct() {
    yield all([
        takeEvery(actionType.INIT_PRODUCTS, initProductsSaga),
        takeEvery(actionType.OPEN_DETAIL, productDetailSaga),
    ])
}

export function* watchOrder() {
    yield takeLatest(actionType.PURCHASE_PRODUCT, purchaseProductSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
    yield takeEvery(actionType.EDIT_OR_CONFIRM_ORDERS, editOrConfirmOrderSaga);
    yield takeEvery(actionType.REMOVE_WHOLE_ITEM, deleteOrderSaga);
    // yield takeEvery(actionType.EDIT_OR_CONFIRM_ORDERS, editOrConfirmAddressSaga);
}