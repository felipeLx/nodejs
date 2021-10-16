import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};



const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseProductStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const purchaseProductSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action._id } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const addItemToOrder = ( state, action ) => {
    console.log(action);
    const newOrder = updateObject( action.orderData, {userId: action.userId} );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseProductFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const editOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders});
};

const addToCart = (state, action) => {
    if(state.orders.length > 0) {
        state.orders.map(item => {
            if(item._id === action.id) {
                item.products.qty += action.up;
                item.products.total = item.products.qty * item.products.price;
                }})
    } else {
        state.orders.push({ id: action.id, products: {qty: action.up}});
    }
    return updateObject(state, {});
} 
  
const removeToCart = (state, action) => {
    if(state.orders.length > 0) {
        state.orders.map((item, index) => {
            if(item._id === action.id && item.products.qty > 1) {
                item.products.qty -= action.down;
                item.products.total = item.products.qty * item.products.price;
            } else {
                item.products.qty = 1;
                item.products.total = item.products.qty * item.products.price;
            }
        })
    } 
    return updateObject(state, {});
};

const removeWholeItem = (state, action) => {
    let newOrders = state.orders.filter(ord => ord._id !== action.id);
    
    return updateObject( state, 
        {orders: newOrders});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_PRODUCT_START: return purchaseProductStart( state, action );
        case actionTypes.PURCHASE_PRODUCT_SUCCESS: return purchaseProductSuccess( state, action )
        case actionTypes.PURCHASE_PRODUCT_FAIL: return purchaseProductFail( state, action );
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        case actionTypes.ADD_ITEM: return addItemToOrder( state, action );
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeToCart(state, action);
        case actionTypes.REMOVE_WHOLE_ITEM: return removeWholeItem(state, action);
        case actionTypes.EDIT_OR_CONFIRM_ORDER_SUCCESS: return editOrdersSuccess(state, action);
        default: return state;
    }
};

export default reducer;