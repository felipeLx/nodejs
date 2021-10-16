import * as actionTypes from './actionTypes';

export const puchase = cart => {
    return {
        type: actionTypes.PURCHASE,
        cart,
    }
}

export const addProduct = ( name ) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName: name
    };
};

export const addProducts = ( products ) => {
    return {
        type: actionTypes.ADD_PRODUCTS,
        products,
    };
};


export const removeProduct = ( name ) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        productName: name
    };
};

export const setProducts = ( products ) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    };
};

export const openDetail = ( product ) => {
    return {
        type: actionTypes.OPEN_DETAIL,
        product: product
    };
};

export const fetchProductsFailed = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILED
    };
};

export const initProducts = () => {
    return {
        type: actionTypes.INIT_PRODUCTS
    };
};