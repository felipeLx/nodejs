// product that will be render in the scream
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import './Product.css';

const product = React.memo(props => {
    const [purchasing, setPurchasing] = useState(false);
    const index = props.index;

    const addToCart = (id) => {
        setPurchasing(true);
        let prId = id;
        let product = props.products.filter(p => p._id === prId);
        let userId = localStorage.getItem('userId');
        startAnimation(prId);
        return props.onAddToOrder({product: product}, userId);
    };

    const startAnimation = (id) => {
        let element = document.getElementById('img'+id);
        console.log(element);
        element.classList.remove('image-product');
        console.log(element);
        element.classList.add('cart-animation');
        setTimeout(() => {
            element.classList.remove('cart-animation');    
        element.classList.add('image-product');
        }, 1000);
    };

    const openProductHandler = (event) => {
        event.preventDefault();
        return window.location.href = `/api/${event.target.id}`; 
    };
 
    return(
        <>
        <Aux>
            <div className='card product' style={{width: '18rem'}}>
                <div className='thumb-item'>
                    <img id={'img'+props.id} alt='' className='image-product' style={{display: 'flex'}} src={props.picture} />
                </div>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text><strong>Preço: R$ </strong> {props.price.toFixed(2)}</Card.Text>
                    <Card.Text><strong>Categoria:</strong> {props.category}</Card.Text>
                    <Card.Text><strong>Descrição:</strong> {props.description}</Card.Text>
                    <Card.Text><strong>Marca:</strong> {props.brand}</Card.Text>    
                <div style={{padding: '20px 0 20px 0'}}>
                <button type='button' style={{border: 'none', display:'inline-flex', flexFlow: 'row', padding: '10px'}} id={props.id} onClick={openProductHandler} className='btn btn-sm btn-light'>Detalhe</button>
                    {props.isAuthenticated ? 
                        <button id={props.id} type='submit' name='submit' style={{border: 'none', display: 'inline-flex', flexFlow: 'row', padding: '10px'}} className='btn btn-sm btn-dark add-to-cart' onClick={() => addToCart(props.id, index)}>Comprar</button> :
                            <button type='submit' name='submit' style={{border: 'none', display: 'inline-flex', flexFlow: 'row', padding: '10px'}} className='btn btn-sm btn-dark' disabled>Login para Comprar</button>
                    }
                </div>
            </div>
        </Aux>
        </>
    )
});

const mapStateToProps = state => {
    return {
        products: state.product.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToOrder: (orderData, userId) => dispatch(actions.addItemToOrder(orderData, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (product);