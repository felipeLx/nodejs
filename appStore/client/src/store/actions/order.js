import * as actionTypes from './actionTypes';

export const purchaseProductSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_SUCCESS,
        orderId: id,
        orderData,
    };
};

export const addItemToOrder = ( orderData, userId ) => {
    const total = orderData.product[0].price;
    const complement = {total: total, userId: userId, qty: 1 };
    const orderDataComplete = {...orderData, ...complement};
    return {
        type: actionTypes.PURCHASE_PRODUCT,
        orderId: userId,
        orderData: orderDataComplete,
    };
};

export const purchaseProductFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_FAIL,
        error,
    };
}

export const purchaseProductStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_START
    };
};

export const purchaseProduct = ( orderData, token ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT,
        orderData,
        token,
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const editOrderStart = () => {
    return {
        type: actionTypes.EDIT_OR_CONFIRM_ORDER_START
    };
};

export const confirmOrEditOrder = (userId, orderData) => {
    return {
        type: actionTypes.EDIT_OR_CONFIRM_ORDERS,
        userId,
        orderData,
    };
};

// export const confirmOrEditAddress = (orderId, addressForm) => {
//     let addressData = [];
//     for(let i in addressForm) {
//         addressData.push({
//             [i]: addressForm[i].value
//         });
//     }
//     return {
//         type: actionTypes.EDIT_OR_CONFIRM_ORDERS,
//         orderId,
//         address: {...addressData},
//     };
// };

export const editOrdersFail = ( error ) => {
    return {
        type: actionTypes.EDIT_OR_CONFIRM_ORDER_FAIL,
        error: error
    };
};

export const editOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.EDIT_OR_CONFIRM_ORDER_SUCCESS,
        orders,
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders,
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        userId,
    }
};

export const addToCart = (id, val) => {
    return {
        type: actionTypes.ADD_TO_CART,
         id,
         up: val
     }
 };
   
 export const removeToCart = (id, val) => {
     return{
         type: actionTypes.REMOVE_FROM_CART,
         id,
         down: val
     }
 };

 export const removeWholeItem = (id, qty, productId) => {
    return{
        type: actionTypes.REMOVE_WHOLE_ITEM,
        id,
        qty,
        productId,
    }
};