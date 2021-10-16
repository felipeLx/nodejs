import axios from 'axios';

let api = '';
const token = localStorage.getItem('token');

if(token){
    api = axios.create({
        baseURL: 'https://loja-lisboa.herokuapp.com/',
        'Content-Type': 'application/json',
        headers: {"Authorization" : `${token}`},
    });
} else {
    api = axios.create({
        baseURL: '/',
        'Content-Type': 'application/json',
    });
}

// Products
export const insertProduct = async payload => await api.post('/api', payload);
export const getAllProducts = async () => await api.get('/api');
export const getOneProduct = async id => await api.get(`/api/${id}`); 
export const updateProductById = async (id, payload) => await api.put(`/api/${id}`, payload);
export const deleteProductById = async id => await api.delete(`/api/${id}`);

// Orders
export const insertOrder = async payload => await api.post('/orders', payload);
export const getAllOrders = async () => await api.get('/orders');
export const getOrderById = async id => await api.get(`/orders/${id}`);
export const updateOrderById = async (id, payload) => await api.put(`/orders/${id}`, payload);
export const deleteOrderById = async id => await api.delete(`/orders/${id}`);

// Users
export const registerUser = async payload => await api.post('/users/signup', payload);
export const loginUser = async payload => await api.post('/users/login', payload);
export const logoutUser = async () => await api.post('/users/logout');
export const getAllUsers = async () => await api.get('/users');
export const getUserById = async id => await api.get(`/users/${id}`);
export const updateUserById = async (id, payload) => await api.put(`/users/${id}`, payload);
export const deleteUserById = async id => await api.delete(`/users/${id}`);

const apis = {
    insertProduct,
    getAllProducts,
    getOneProduct,
    updateProductById,
    deleteProductById,
    insertOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};

export default apis;