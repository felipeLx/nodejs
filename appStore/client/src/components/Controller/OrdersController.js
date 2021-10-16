import React, { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

import api from '../../api/index';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';

const ordersController = React.memo(props => {

    const [ordersList, setOrdersList] = useState([]);
    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nome do produto'
            },
            value: ''
        },
        brand: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Marca'
            },
            value: ''
        },
        category: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Categoria'
            },
            value: ''
        },
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Preço'
            },
            value: ''
        },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Descrição'
            },
            value: ''
        },
    });
    
    useEffect(() => {
        api.getAllOrders()
            .then(orders => {
                setOrdersList(orders.data);
            })
            .catch(err => console.log(err));
    }, []);
    

    const editHandler = async(id) => {
        await api.updateOrderById(id)
            .then(ord => console.log('edited'))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteOrderById(id)
        .then(ord => console.log('deleted'))
        .catch(err => console.log(err))
    };

    const createHandler = async() => {

        return <p>create new product</p>
    };

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                })
            });
            setControls(updatedControls);
        };

    const submitHandler = ( event ) => {
        event.preventDefault();
        console.log('submitHandler - productsController');
        
    };
        

    // const formElementsArray = [];
    // for ( let key in controls ) {
    //     formElementsArray.push( {
    //         id: key,
    //         config: controls[key]
    //     } );
    // };

    // let form = formElementsArray.map( formElement => (
    //     <Input
    //         key={formElement.id}
    //         elementType={formElement.config.elementType}
    //         elementConfig={formElement.config.elementConfig}
    //         value={formElement.config.value}
    //         changed={( event ) => inputChangedHandler( event, formElement.id )} />
    // ));
    let form = ordersList.map(order => (
        <Card key={order._id} className="card">
            <Card.Body className="card-body">
                <Card.Text><strong>ID:</strong> {order._id}</Card.Text>
                <Card.Text><strong>UserId:</strong> {order.userId}</Card.Text>
                <Card.Text><strong>ProductId:</strong> {order.productId}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button onClick={(event) => editHandler(event.target.params.id)} className="btn btn-info btn-space">EDIT</Button>
                <Button onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
            </ButtonGroup>
        </Card>

    ));

    if ( props.loading ) {
        form = <Spinner />
    }

    let errorMessage = null;

    if ( props.error ) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    return(
        <div className="container">
            <div className="col">
                
                <form>
                  {form}
                </form>
            </div>
        </div>
    );
    
});

export default ordersController;