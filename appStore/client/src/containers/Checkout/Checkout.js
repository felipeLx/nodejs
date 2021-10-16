import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
    console.log('checkout');
    console.log(props);
    
    const checkoutCancelledHandler = () => {
        return window.location.href = `/`
    }

    const checkoutContinuedHandler = () => {
        window.history.replace( '/checkout/contact-data' );
    }

    let summary = <Redirect to="/" />
    if ( props.orders ) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    products={props.orders}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={'/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
    return summary;
};


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        purchased: state.order.purchased
    }
};

export default connect( mapStateToProps )( Checkout );