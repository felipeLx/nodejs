import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Product from '../../components/Product/Product';
import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import Carousel from '../../components/Bootstrap/Carousel/Carousel';
import api from '../../api';

const ProductsBuilder = props => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        try {
            api.getAllProducts()
                .then(prds => {
                    props.onAddProducts(prds.data.product);
                   return setProducts(prds.data.product)
                });
        } catch(err) {
            console.log('Error to fetch the data in the front-end component: ' + err);
        }
    };  

    let productArray = [];

    if(products.length > 0){
        productArray = products.map(prd => {          
            return(          
                <div key={prd._id} style={{backgroundColor: '#40bad5', textAlign:'center', padding: '10px 10px 0 20px'}}>
                <Aux>
                    <Product 
                        id={prd._id} 
                        name={prd.name}
                        brand={prd.brand}
                        price={prd.price}
                        description={prd.description}
                        category={prd.category}
                        isAuthenticated={props.isAuthenticated}
                        picture={prd.picture}
                    />          
                </Aux>
                </div>
                )                
            });
    }

    return ( 
        <Aux>
            <section>
                <Carousel />            
            </section>
            <section>
                <div className='row row-sm-4 row-lg-8' style={{alignItems: 'center'}}>
                    {productArray}
                </div>
            </section>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        error: state.product.error,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId,
        prQuantity: state.product.quantityPerId,
        orders: state.order.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddProducts: (products) => dispatch(actions.addProducts(products)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductsBuilder);