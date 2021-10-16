import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Order.css';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Product/OrderSummary/OrderSummary';
// import Checkout from '../../containers/Checkout/Checkout';
import * as actions from '../../store/actions/index';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

const order = React.memo(props => {
    const [orders, setOrders] = useState([]);
    const [purchasing, setPurchasing] = useState(false);
    const [purchasingConfirmed, setPurchasingConfirmed] = useState(false);

    useEffect(() => {
        setOrders(props.products);
    }, [props.products]);

    const lessQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty - 1, total: items[index].qty * items[index].price };
        items[index] = item;
        setOrders([...items]);
        props.onSubtractQuantity(orderId, 1);
    };


    const moreQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty + 1, total: items[index].qty * items[index].price};
        items[index] = item;
        setOrders([...items]);
        props.onAddQuantity(orderId, 1);
    };

    const removeFromOrderHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const prQty = orders.filter(or => {
            if(or._id === orderId) {
                return or.products.qty;
            }
        });
        const qty = prQty[0].products.qty;
        const productId = prQty[0].products._id;
        let items =orders.filter(or => or._id !== orderId);
        
        setOrders([...items]);
        props.onRemoveItem(orderId, qty, productId);
        
    };

    const checkoutHandler = event => {
        event.preventDefault();
        setPurchasing(true);
    };
 
    let orderSummary = null;

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        let userId = localStorage.getItem('userId');
        setPurchasingConfirmed(true);
        props.onConfirmOrder(userId, orders);
        setPurchasing(false);
    };

    const addressHandler = () => {
        
    };
    
    const productOutput = orders.map((prod, index) => {
        let products = [...orders];
        orderSummary = <OrderSummary
                productsList={products}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />;
            return (
                <tbody key={index}>
                    <tr className='col resume'>
                        <td><strong>N. </strong>{index+1}</td>
                        <td><strong>Nome: </strong>{prod.products.name}  </td>
                        <td><strong>  Preço: </strong>{prod.products.price.toFixed(2)}  </td>
                        <td><strong>  Quantidade: </strong>{prod.products.qty}  </td>
                        <td style={{paddingRight: '0'}}><button type='button' id={prod._id} className='btn btn-sm btn-light' onClick={lessQtyHandler} >  - </button></td>
                        <td style={{paddingLeft: '0'}}><button type='button' id={prod._id} className='btn btn-sm btn-dark' onClick={moreQtyHandler}> +  </button></td>
                        <td><strong>  Total: </strong>{prod.products.total.toFixed(2)}  </td>
                        <td><button type='button' id={prod._id} className='btn btn-sm btn-danger' style={{borderRadius: '40%'}} onClick={removeFromOrderHandler}>cancelar</button></td>
                    </tr>
                </tbody>
            )
    });

    return (
        
        <div>
            <section>
                {!purchasingConfirmed ? <button type='button' className='btn btn-md btn-success check-out' onClick={checkoutHandler}>CONFIRMAR PEDIDO</button> :
                <button type='button' className='btn btn-md btn-dark check-out' onClick={addressHandler}>CONFIRMAR ENDEREÇO</button>}
                <div className='row order'>
                    <table>
                        {purchasingConfirmed ? null : productOutput}
                    </table>
                        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                            {orderSummary}
                        </Modal> 
                </div>
            </section>
            <div className='row'>
                <section>
                    {purchasingConfirmed && <ContactData orders={orders} />}
                </section>
            </div>
        </div>
        
    );
});


const mapDispatchToProps = dispatch => {
    return {
        onAddQuantity: (id, val)=> dispatch(actions.addToCart(id, val)),
        onSubtractQuantity: (id, val)=> dispatch(actions.removeToCart(id, val)),
        onRemoveItem: (id, quantity, productId)=> dispatch(actions.removeWholeItem(id, quantity, productId)),
        onConfirmOrder: (userId, orderData) => dispatch(actions.confirmOrEditOrder(userId, orderData)),
    };
};

export default connect(null, mapDispatchToProps) (order);