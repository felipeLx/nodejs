import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const Orders = props => {
    const {userId} = props;
    
    useEffect(() => {
        showOrderFromUser(userId);
    },[]);
    
    const showOrderFromUser = async(userId) => {
        try{
            await props.onFetchOrders(userId);
        } catch(err) {
            console.log(err);
        }
    };

        let orders = <h5>Ainda não há produtos no carrinho!</h5>;
        if ( props.orders.length > 0 ) {
            const productsArray = [...props.orders];
            orders = <Order
                        keys={productsArray.keys}
                        products={productsArray}/>
        }
        return (
            <div className='container' style={{paddingTop: '20px'}}>
                {orders}
                
            </div>
        );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId|| state.sigunp.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userId) => dispatch( actions.fetchOrders(userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );