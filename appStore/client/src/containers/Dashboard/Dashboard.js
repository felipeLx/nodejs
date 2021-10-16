import React, { useState } from 'react';
import { Card, Button, Form, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import ProductsController from '../../components/Controller/Products/ProductsController';
import UsersController from '../../components/Controller/Users/UsersController';
import OrdersController from '../../components/Controller/Orders/OrdersController';

const Dashboard = props => {
    const [createProduct, setCreateProduct] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    // const [newProduct, setNewProduct] = useState({
    //     product: '',
    //     brand: '',
    //     price: '',
    //     description: ''
    // });
    
    const productsHandler = () => {
        setShowProducts(!showProducts);
        setShowOrders(false);
        setShowUsers(false);
    };

    const usersHandler = () => {
        setShowUsers(!showUsers);
        setShowOrders(false);
        setShowProducts(false);
    };

    const ordersHandler = () => {
        setShowOrders(!showOrders);
        setShowProducts(false);
        setShowUsers(false);
    };

    let form = '';

    const createUserHandler = () => {
        console.log('createUserHandler = Dashboard');   
    };

      
  if ( !props.isAuthenticated ) {
    window.location.assign('/')
  }

    const createHandler = () => {
        setCreateProduct(!createProduct);
        return (
            form = (
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control type="text" placeholder="Nome popular do produto" />
                    </Form.Group>

                    <Form.Group controlId="formBrand">
                        <Form.Label>Marca ou Fabricante</Form.Label>
                        <Form.Control type="text" placeholder="Marca ou Fabricante" />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="text" placeholder="Preço de venda" />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Descrição ou Características</Form.Label>
                        <Form.Control type="text" placeholder="ex. Borracha de 15cm, duas cores, flexível" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => createUserHandler()}>
                        ENVIAR
                    </Button>
                </Form>
            )
        )
    };
    
    return(
        <div className="container">
            <div className="row">
                <div  className="col-md-4 col-lg-2">
                    <Card>
                        <Card.Title>Produtos</Card.Title>
                        <ButtonGroup>
                            <Button onClick={() => productsHandler()} className="btn btn-primary">Ver Produtos</Button>
                            <Button onClick={() => createHandler()} className="btn btn-warning">Novo Produto</Button>
                        </ButtonGroup>
                    </Card>
                </div>
                <div  className="col-md-4 col-lg-2">
                    <Card>
                        <Card.Title>Pedidos</Card.Title>
                        <Button onClick={() => ordersHandler()} variant="secondary">Ver</Button>
                    </Card>
                </div>
                <div className="col-md-4 col-lg-2">
                    <Card>
                        <Card.Title>Usuários</Card.Title>
                        <Button onClick={() => usersHandler()} variant="primary">Ver</Button>
                    </Card>
                </div>
            </div>
            <div className="row">
                {createProduct && {form}}
            </div>
            <div className="row">
                {showProducts && <ProductsController />}
            </div>
            <div className="row">
                {showUsers && <UsersController />}
            </div>
            <div className="row">
                {showOrders && <OrdersController />}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
  };

export default connect(mapStateToProps)(Dashboard);