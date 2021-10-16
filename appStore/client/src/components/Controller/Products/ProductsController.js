import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../../api/index';
import Input from '../../UI/Input/Input';
import { updateObject } from '../../../shared/utility';

const productsController = React.memo(props => {

    const [editFields, setEditFields] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false); 
    const [productsList, setProductsList] = useState([]);
    const [editableProductId, setEditableProductId] = useState('');
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
                placeholder: 'Marca ou fabricante'
            },
            value: ''
          },
        description: {
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Descrição do produto'
            },
            value: ''
          },
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Preço de venda'
            },
            value: 0
          },
        category: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Categoria'
            },
            value: ''
          },
          quantity: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Quantidade'
            },
            value: 0
          },
          picture: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Link da imagem'
            },
            value: 0
          }
    });
    
    useEffect(() => {
        api.getAllProducts()
            .then(products => {
                setProductsList(products.data);
            })
            .catch(err => console.log(err));
    }, []);

    const editHandler = async(event) => {
        event.preventDefault();     
        setEditFields(!editFields); 
        let index = event.target.id;
        let idProductToEdited = productsList[index]._id;
        setEditableProductId(idProductToEdited);
        const response = await api.getOneProduct(idProductToEdited);
        
        try {
            setControls({
                name: {
                    value: response.data.name
                },
                brand: {
                    value: response.data.brand
                },
                price: {
                    value: response.data.price
                },
                quantity: {
                    value: response.data.quantity
                },
                description: {
                    value: response.data.description
                },
                picture: {
                    value: response.data.picture.toString()
                },
                category: {
                    value: response.data.category
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


    const submitProductHandler = () => {
        const updateProduct = {
            product: controls.name.value,
            brand: controls.brand.value,
            category: controls.category.value,
            price: controls.price.value,
            description: controls.description.value,
            picture: controls.picture.value,
            quantity: controls.quantity.value
        };

        const response = api.updateProductById(editableProductId, updateProduct);
        console.log(response);
        
    };

    const deleteHandler = async(event) => {
        event.preventDefault();
        setDeleteProduct(!deleteProduct);
        let index = event.target.id;
        let idProductToDelete = productsList[index]._id;
        let productName = productsList[index]._name;
        await api.deleteProductById(idProductToDelete)
        .then(setTimeout(window.alert(`${productName} deleted!`), 3000))
        .catch(err => console.log(err))
    };

    let form = [];

    if(productsList.length > 0) {
        let elementIndex;
        productsList.forEach(product => {
            for(let i = 0; i < productsList.length; i++) {
                if(productsList[i].name === product.name) {
                    elementIndex = i;
                }}
            form.push(
                <div key={product._id} className='col' >
                    <Card>
                        <Card.Body>
                            <Card.Text><strong>Name: </strong>{product.name}</Card.Text>
                            <Card.Text><strong>Marca</strong>{product.brand}</Card.Text>
                            <Card.Text><strong>Preço: R$ </strong>{product.price}</Card.Text>
                            <Card.Text><strong>Quantidade: </strong>{product.quantity}</Card.Text>
                            <Card.Text><strong>Categoria: </strong>{product.category}</Card.Text>
                            <Card.Text><strong>Descrição:</strong> {product.description}</Card.Text>
                            <Card.Text><strong>Link da imagem:</strong> {product.picture.toString()}</Card.Text>
                        </Card.Body>
                    </Card>
                    <div className='col'>
                        {!editFields ? 
                            <Button type='button' id={elementIndex} style={{margin: '10px'}} onClick={editHandler} className='btn btn-warning'>EDITAR</Button> :
                            null
                        }
                    
                        {!deleteProduct ? 
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
                    <form action="POST" onSubmit={submitProductHandler}>
                        {input}
                        <Button type='submit' style={{margin: '10px'}} className='btn btn-info'>ENVIAR</Button>
                    </form> : 
                    <div>{form}</div>}
            </div>
        </div>
    ); 
});

export default productsController;