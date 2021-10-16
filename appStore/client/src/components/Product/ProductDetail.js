// product that will be render in the scream
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import api from '../../api/index';
import Aux from '../../hoc/Aux/Aux';

const productDetail = React.memo(props => {
    const [product, setProduct] = useState({});
    const productId = props.match.params.id;

    useEffect(() => {
        openDetailHandler(productId);
    }, [productId]);

    const openDetailHandler = async id => {
        try{
            const response = await api.getOneProduct(id);
            setProduct(response.data.product);
        } catch(err) {
            console.log('not possible to open detail: ' + err);
        }
    }

        let card = (
            <div key={product._id} className='col col-md-4 col-sm-4 col-lg-4'>
                <Card className='card'>
                    <Card.Img className='card-img-top' variant='top' src={product.picture} />
                    <Card.Body>
                        <Card.Title>Nome: {product.name}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>Categoria: {product.category}</Card.Subtitle>
                        <Card.Text>Descrição: {product.description}</Card.Text>
                        <Card.Text>Preço: R$ {Number.parseFloat(product.price).toFixed(2)}</Card.Text>
                        <Card.Text>Marca: {product.brand}</Card.Text>
                        <Card.Link href='#'>Comprar</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        );
    
    
    return (
        <Aux>
            <hr />
            <section>
                <div className='container'>
                    <div className='row'>
                        {card}
                    </div>
                </div>
            </section>
        </Aux>
    );
});

export default productDetail;