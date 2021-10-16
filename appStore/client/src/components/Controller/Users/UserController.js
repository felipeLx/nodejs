import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import api from '../../../api/index';
import Input from '../../UI/Input/Input';
import { updateObject  } from '../../../shared/utility';

const userController = React.memo(props => {

    const [usersList] = useState([]);
    const [editFields, setEditFields] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [editableUserId, setEditableUserId] = useState('');
    const [controls, setControls] = useState({
        username: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Nome do usuário'
          },
          value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail'
            },
            value: ''
        }
    });
   

    useEffect(() => {
        const getUserHandler = async() => {
            await api.getUserById(props.userId)
                            .then(user => console.log(user))
                            .catch(err => console.log(err));
        };

        getUserHandler();
    }, [props.userId]);

    const editHandler = async(event) => {
        event.preventDefault();     
        setEditFields(!editFields); 
        let index = event.target.id;
        let idUserToEdited = usersList[index]._id;
        setEditableUserId(idUserToEdited);
        const response = await api.getUserById(idUserToEdited);
        
        try {
            setControls({
                username: {
                    value: response.data.username
                },
                email: {
                    value: response.data.email
                }
            })
        } catch(err) {
                console.log(err);
            }
    };
      
    let input = '';
    
    const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push({
                id: key,
                config: controls[key]
        });
    };

    if(editFields) {
        input = formElementsArray.map( formElement => {
            return (
            <div key={formElement.id}>
            <Input
                value={formElement.config.value}
                label={formElement.id}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
            </div>    
            )
        });   
    };


    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                })
            });
            setControls(updatedControls);
        };


    const submitUserHandler = async() => {
        const updateUser = {
            username: controls.username.value,
            email: controls.email.value,
        };

        const response = await api.updateUserById(editableUserId, updateUser);
        console.log(response);
        
    };

    const deleteHandler = async(event) => {
        event.preventDefault();
        setDeleteUser(!deleteUser);
        let index = event.target.id;
        let idUserToDelete = usersList[index]._id;
        let userName = usersList[index]._name;
        await api.deleteUserById(idUserToDelete)
        .then(setTimeout(window.alert(`${userName} deleted!`), 3000))
        .catch(err => console.log(err))
    };

    let form = [];

    if(usersList.length > 0) {
        let elementIndex;
        usersList.forEach(user => {
            for(let i = 0; i < usersList.length; i++) {
                if(usersList[i].name === user.name) {
                    elementIndex = i;
                }}
            form.push(
                <div key={user._id} className='col' >
                    <Card key={user._id} className="card">
                        <Card.Body className="card-body">
                            <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
                            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                            <Card.Text><strong>OrderId:</strong> {user.orderId}</Card.Text>
                            <Card.Text><strong>Date:</strong> {user.dateCreated}</Card.Text>
                        </Card.Body>
                    </Card>
                    <div className='col'>
                        {!editFields ? 
                            <Button type='button' id={elementIndex} style={{margin: '10px'}} onClick={editHandler} className='btn btn-warning'>EDITAR</Button> :
                            null
                        }
                    
                        {!deleteUser ? 
                            <Button type='button' id={elementIndex} style={{margin: '10px'}} onClick={deleteHandler} className='btn btn-danger btn-space'>DELETE</Button> :
                            null
                            }
                    </div>
                    </div>
            )
        });
    }

    return(
        <div className='container'>
            <div className='row'>
                {editFields ? 
                    <form action="POST" onSubmit={submitUserHandler}>
                        {input}
                        <Button type='submit' style={{margin: '10px'}} className='btn btn-info'>ENVIAR</Button>
                    </form> : 
                    <div>{form}</div>}
            </div>
        </div>
    ); 
});

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
  };

export default connect(mapStateToProps)(userController);