export {
    addProduct,
    addProducts,
    removeProduct,
    initProducts,
    setProducts,
    fetchProductsFailed,
    openDetail,
    puchase
} from './product';
export {
    purchaseProduct,
    purchaseInit,
    fetchOrders,
    purchaseProductStart,
    purchaseProductSuccess,
    purchaseProductFail,
    fetchOrdersSuccess,
    fetchOrdersFail,
    fetchOrdersStart,
    addItemToOrder,
    addToCart,
    removeToCart,
    removeWholeItem,
    editOrderStart,
    editOrdersFail,
    editOrdersSuccess,
    confirmOrEditOrder,
    // confirmOrEditAddress
} from './order';
export {
    login,
    logout,
    authCheckState,
    logoutSucceed,
    authStart,
    authSuccess,
    authFail,
    signup,
    signupStart,
    signupFail,
    adminSuccess
} from './auth';