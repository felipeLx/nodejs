import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../../shared/utility';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nome Completo'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Endereço (rua, av, etc.)'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        complement: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Complemento'
            },
            value: '',
            valid: true,
            touched: false
        },
        neighborhood: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Bairro'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Cidade e Estado'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Código Postal'
            },
            value: '',
            validation: {
                required: false,
                minLength: 5,
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
    });

    const [formIsValid, setFormIsValid] = useState(true);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const confirmAndUpdateHandler = event => {
        event.preventDefault();
        alert('Obrigado pela sua compra! Verifique o email com os detalhes e para qualquer problema contacte nosso call-center com o número dos pedidos.');
        window.location.assign('/');
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={confirmAndUpdateHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button type='submit' btnType="success">CONFIRMAR</Button>
        </form>
    );
    if ( props.loading ) {
        form = <Spinner />;
    }
    return (
        <div className='contactData'>
            <h4>Confirmar o endereço para envio</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));