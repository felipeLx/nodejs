import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    product: '',
    totalPrice: 0,
    quantityPerId: [],
    error: false,
    building: false
};

const addProduct = ( state, action ) => {
    const updatedProduct = { [action.productName]: state.products[action.productName] + 1 }
    const updatedProducts = updateObject( state.products, updatedProduct );
    const updatedState = {
        products: updatedProducts,
        quantity: action.quantity + 1,
        totalPrice: state.totalPrice + state.products.price[action.productName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeProduct = (state, action) => {
    const updatedProd = { [action.productName]: state.products[action.productName] - 1 }
    const updatedProds = updateObject( state.products, updatedProd );
    const updatedState = {
        products: updatedProds,
        quantity: action.quantity - 1,
        totalPrice: state.totalPrice - state.products.price[action.productName],
        building: true
    }
    return updateObject( state, updatedState );
};

const setProducts = (state, action) => {
    return updateObject( state, {
        products: {
            products: action.products
        },
        totalPrice: 0,
        error: false,
        building: false
    });
};

const openDetail = (state, action) => {
    return updateObject(state, {
        product: action.product
    })
}

const fetchProductsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const purchase = (state, action) => {
    const ids = action.cart.map(item => item.id);
      return Object.assign([], state.map(item => {
        if(ids.includes(item.id)){
          item.inventory -= action.cart.filter(p => p.id === item.id)[0].quantity;
        }
        return item;
      }))
};

const addProducts = (state, action) => {
    return updateObject(state, {products: action.products})
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PRODUCT: return addProduct( state, action );
        case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);    
        case actionTypes.OPEN_DETAIL: return openDetail(state, action);    
        case actionTypes.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action);
        case actionTypes.PURCHASE: return purchase(state, action);
        case actionTypes.ADD_PRODUCTS: return addProducts(state, action);
        default: return state;
    }
};

export default reducer;