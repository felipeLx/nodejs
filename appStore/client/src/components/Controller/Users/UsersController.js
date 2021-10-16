import React, { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

import api from '../../../api/index';
// import Spinner from '../../UI/Spinner/Spinner';
// import { updateObject } from '../../../shared/utility';

const usersController = React.memo(props => {

    const [usersList, setUsersList] = useState([]);
    // const [controls, setControls] = useState({
    //     name: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Nome do produto'
    //         },
    //         value: ''
    //     },
    //     brand: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Marca'
    //         },
    //         value: ''
    //     },
    //     category: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Categoria'
    //         },
    //         value: ''
    //     },
    //     price: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Preço'
    //         },
    //         value: ''
    //     },
    //     description: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'textarea',
    //             placeholder: 'Descrição'
    //         },
    //         value: ''
    //     },
    // });
    
    useEffect(() => {
        api.getAllUsers()
            .then(users => {
                setUsersList(users.data);
            })
            .catch(err => console.log(err));
    }, []);
    

    const editHandler = async(id) => {
        await api.updateUserById(id)
            .then(prod => console.log('updated'))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteUserById(id)
        .then(prod => console.log('deleted'))
        .catch(err => console.log(err))
    };

    // const createHandler = async() => {

    //     return <p>create new product</p>
    // };

    // const inputChangedHandler = ( event, controlName ) => {
    //     const updatedControls = updateObject( controls, {
    //         [controlName]: updateObject( controls[controlName], {
    //             value: event.target.value,
    //             })
    //         });
    //         setControls(updatedControls);
    //     };

    // const submitHandler = ( event ) => {
    //     event.preventDefault();
    //     console.log('submitHandler - productsController');
        
    // };
        

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

    let form = usersList.map(user => (
        <Card key={user._id} className="card">
            <Card.Body className="card-body">
                <Card.Text><strong>ID:</strong> {user._id}</Card.Text>
                <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
                <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                <Card.Text><strong>OrderId:</strong> {user.orderId}</Card.Text>
                <Card.Text><strong>Date:</strong> {user.dataCreated}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button onClick={(event) => editHandler(event.target.params.id)} className="btn btn-info btn-space">EDIT</Button>
                <Button onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
            </ButtonGroup>
                    
        </Card>

    ));

    return(
        <div className="container">
            <div className="row">
                <form>
                  {form}
                </form>
            </div>
        </div>
    );
    
});

export default usersController;