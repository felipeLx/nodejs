import React, { useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

import ProductsController from '../../components/Controller/Products/ProductsController';
import UsersController from '../../components/Controller/Users/UsersController';
import OrdersController from '../../components/Controller/Orders/OrdersController';
import Input from '../../components/UI/Input/Input';
import { updateObject } from '../../shared/utility';
import api from '../../api/index';
import Aux from '../../hoc/Aux/Aux';

const AdminDashboard = props => {
    const [createProduct, setCreateProduct] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [productFields, setProductFields] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nome do Produto'
            },
            value: '',
            valid: false,
            touched: false
        },
        brand: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Marca ou Fabricante'
            },
            value: '',
            valid: false,
            touched: false
        },
        category: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Categoria'
            },
            value: '',
            valid: false,
            touched: false
        },
        price: {
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: 'Preço de venda'
            },
            value: 0,
            valid: false,
            touched: false
        },
        quantity: {
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: 'Quantidade de compra'
            },
            value: 0,
            valid: false,
            touched: false
        },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Descrição do produto'
            },
            value: '',
            valid: false,
            touched: false
        },
        picture: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Link da imagem do produto'
            },
            value: '',
            valid: false,
            touched: false
        },
    })

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

    const createHandler = () => {
        setCreateProduct(!createProduct);
    };

    const inputChangedHandler = ( event, fieldName ) => {
        const updatedFields = updateObject( productFields, {
            [fieldName]: updateObject( productFields[fieldName], {
                value: event.target.value,
                })
            });
            setProductFields(updatedFields);
        };

    const submitHandler = async(event) => {
        event.preventDefault();

        let newProduct = {
            name: productFields.name.value,
            brand: productFields.brand.value, 
            description: productFields.description.value,
            price: productFields.price.value, 
            quantity: productFields.quantity.value, 
            category: productFields.category.value,
            picture: productFields.picture.value
        }

        const response = await api.insertProduct(newProduct);
        if(response) {
            setTimeout(window.alert('Product added!'), 1000);
            setProductFields({});
        }
    };

    const formElementsArray = [];
    for ( let key in productFields ) {
        formElementsArray.push( {
            id: key,
            config: productFields[key]
        } );
    };
  
    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            value={formElement.config.value}
            touched={formElement.config.touched}
            label={formElement.config.elementConfig.placeholder}
            changed={( event ) => inputChangedHandler( event, formElement.id )} />
    ));

    return(
        <Aux>
        <div className='container'>
            <div className='row'>
            <div className='col-md-4 col-lg-6'>
                    <Card style={{padding: '10px', margin: '10px'}}>
                        <Card.Title><h5>Produtos</h5></Card.Title>
                            <ButtonGroup>
                                <Button onClick={() => productsHandler()} className='btn btn-primary'>Ver Produtos</Button>
                                <Button onClick={() => createHandler()} className='btn btn-warning'>Novo Produto</Button>
                            </ButtonGroup>
                    </Card>
               
                    <Card style={{padding: '10px', margin: '10px'}}>
                        <Card.Title><h5>Pedidos</h5></Card.Title>
                        <Button onClick={() => ordersHandler()} variant='secondary'>Ver</Button>
                    </Card>
               
                    <Card style={{padding: '10px', margin: '10px'}}>
                        <Card.Title><h5>Usuários</h5></Card.Title>
                        <Button onClick={() => usersHandler()} variant='primary'>Ver</Button>
                    </Card>
                </div>
            
            <div  className='col-md-4 col-lg-6'> 
                {createProduct && 
                    <form action='POST' onSubmit={submitHandler}>
                        {form}
                        <Button type='submit' className='btn btn-success'>ENVIAR</Button>
                    </form> }
            </div>
            <div  className='col-md-4 col-lg-6'>
                {showProducts && <ProductsController />}
            </div>
            <div  className='col-md-4 col-lg-6'>
                {showUsers && <UsersController />}
            </div>
            <div  className='col-md-4 col-lg-6'>
                {showOrders && <OrdersController />}
            </div>
            </div>
        </div>
        </Aux>
    );
};

  export default AdminDashboard;