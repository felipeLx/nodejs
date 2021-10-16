import React from 'react';
import { connect } from 'react-redux';
import { animations } from 'react-animation';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const styleNav = {
    animation: animations.popIn
}
const navigationItems = props => {    
    let totalOrders = <button className='btn btn-sm' style={{margin: '3px', borderRadius: '100%', color: 'white', border: '0.2px solid #eee', styleNav}}>{props.orders.length}</button>;

    return(
        <ul className='navigationItems'>
            <NavigationItem link='/api' exact>Produtos</NavigationItem>
            {/* {props.isAuthenticated && !props.isAdmin
                ? <NavigationItem link='/dashboard'>Dashboard</NavigationItem>
                : null } */}
            {props.isAuthenticated && !props.isAdmin
                ? <NavigationItem link={`/orders/${props.userId}`}>
                    <i className='fas fa-shopping-cart'>
                        Carrinho
                    </i>
                    {props.orders.length > 0 ? totalOrders : null}
                </NavigationItem>
                : null }
            {/* {props.isAdmin && props.isAuthenticated
                ? <NavigationItem link='/dashboard'>Dashboard</NavigationItem>
                : null} */}
            {!props.isAuthenticated
                ? <NavigationItem link='/users/login'>Login</NavigationItem>
                : <NavigationItem link='/users/logout'>Logout</NavigationItem>}
        </ul>
    );  
};

const mapStateToProps = state => ({
    userId: state.auth.userId,
    orders: state.order.orders
  });

export default connect(mapStateToProps)(navigationItems); 