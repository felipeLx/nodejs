import React from 'react';
import { Button } from 'react-bootstrap';

import Product from '../../Product/Product';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    console.log(props);
    return props.products.map((product, index) => {
        console.log(product);
        return (
            <div key={index} className='checkoutSummary'>
                <h1>Espero que tenha gostado!</h1>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Product 
                        name={product.products.name}
                        brand={product.products.brand}
                        price={product.products.price}
                        description={product.products.description}
                        category={product.products.category}
                        picture={product.products.picture}
                    />
                </div>
                <Button 
                    className='btn btn-sm btn-danger'
                    clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                    className='btn btn-sm btn-primary'
                    clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        );
    })
}

export default checkoutSummary;