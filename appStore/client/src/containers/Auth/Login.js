import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const login = React.memo(props => {
  const [controls, setControls] = useState({
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Username'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
  }
  });

  const inputChangedHandler = ( event, controlName ) => {
  const updatedControls = updateObject( controls, {
      [controlName]: updateObject( controls[controlName], {
          value: event.target.value,
          valid: checkValidity( event.target.value, controls[controlName].validation ),
          touched: true
          })
      });
      setControls(updatedControls);
  };

  const submitHandler = async(event) => {
    event.preventDefault();
      try {
        props.onLogin( controls.username.value, controls.password.value );
      } catch(err) {
        console.log(err);
      }
  };

  const formElementsArray = [];
  for ( let key in controls ) {
      formElementsArray.push( {
          id: key,
          config: controls[key]
      } );
  };

  let form = formElementsArray.map( formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={( event ) => inputChangedHandler( event, formElement.id )} />
  ));

  if ( props.loading ) {
    form = <Spinner />
  }

  return (
    <div className='container'>
    <div className='row' style={{padding: '20px'}}>
      <div className='col s8 offset-s2'>
        <div className='col s12' style={{ paddingLeft: '11.250px' }}>
          <h4>
            <b>Login</b>
          </h4>
          <p className='grey-text text-darken-1'>
            Ainda não tem uma conta? <Link to='/users/signup'>Registrar</Link>
          </p>
        </div>
        <form action='POST' onSubmit={submitHandler}>
          {form}
          <Button type='submit' btnType='darking'>ENVIAR</Button>
        </form>
      </div>
    </div>
    </div>
  );
});

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      isAuthenticated: state.auth.token !== null,
      isAdmin: state.auth.isAdmin,  
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: ( username, password ) => dispatch( actions.login( username, password ) ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);