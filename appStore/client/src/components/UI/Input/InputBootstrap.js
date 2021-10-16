import React, { useState } from 'react';
import {InputGroup, FormControl, Dropdown, DropdownButton} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const inputBootstrap = React.memo(props => {
  const [newProduct, setNewProduct] = useState({
    product: {
      name: '',
      brand: '',
      quantity: '',
      price: '',
      description: '',
      picture: '',
      category: '',
    }
  });

  const {onSubmit} = props;

  const productPostHandler = async(product) => {
    const newProduct = {
      name: product.name,
      brand: product.brand,
      quantity: product.quantity,
      price: product.price,
      description: product.description,
      picture: product.picture,
      category: product.category,
    }
    props.onSubmit(newProduct);
  }

  const inputNameHandler = (field) => {
    setNewProduct({ product: {
      name: field.newName
    }})
  }

  return(
    <form onSubmit={productPostHandler}>
      <InputGroup className='mb-3' onChange={(id) => inputNameHandler(id)}>
        <FormControl
          placeholder='Nome do produto'
          aria-label='Nome do produto'
          aria-describedby='basic-addon1'
          type='text'
        />
      </InputGroup>

      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Marca ou Fabricante'
          aria-label='Marca ou Fabricante'
          aria-describedby='basic-addon1'
          type='text'
        />
      </InputGroup>

      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Quantidade'
          aria-label='Quantidade'
          aria-describedby='basic-addon1'
          type='number'
        />
      </InputGroup>

      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>R$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Preço de venda'
          aria-label='Preço de venda'
          type='number'
        />
      </InputGroup>

      <InputGroup className='mb-3'>
        <DropdownButton
          as={InputGroup.Prepend}
          variant='outline-secondary'
          title='Category'
          id='category'
        >
          <Dropdown.Item href='#'>Papelaria</Dropdown.Item>
          <Dropdown.Item href='#'>Artigo para festas</Dropdown.Item>
          <Dropdown.Item href='#'>Objetos de casa/banheiro</Dropdown.Item>
          <Dropdown.Item href='#'>Roupa e acessórios</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-describedby='basic-addon1' type='text' />
      </InputGroup>

      <label htmlFor='basic-url'>Link da foto do produto</label>
      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id='basic-addon3'>
            https://example.com/api/borracha.png
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id='pics' aria-describedby='basic-addon3' type='file' />
      </InputGroup>

      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>Descrição</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as='textarea' aria-label='With textarea' type='text' />
      </InputGroup>
    </form>
  )
});

const mapDispatchToProps = dispatch => {
  return {
      onSubmit: ( product ) => dispatch( actions.createProduct( product ) ),
  };
};

export default connect(null, mapDispatchToProps)(inputBootstrap);