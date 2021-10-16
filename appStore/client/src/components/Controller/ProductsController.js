import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../api/index';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';

const productsController = React.memo(props => {

    const [editFields, setEditFields] = useState(false); 
    const [productsList, setProductsList] = useState([]);
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
        api.getAllProducts()
            .then(products => {
                setProductsList(products.data);
            })
            .catch(err => console.log(err));
    }, []);

    const editHandler = async(id) => {
        await api.updateProductById(id)
            .then(prod => console.log(prod))
            .catch(err => console.log(err))
    };

    const deleteHandler = async(id) => {
        await api.deleteProductById(id)
        .then(prod => console.log('deleted'))
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


//   const formElementsArray = [];
//   for ( let key in controls ) {
//       formElementsArray.push( {
//           id: key,
//           config: controls[key]
//       } );
//   };

//   form = formElementsArray.map( product => (
//         <Input
//             key={product.id}
//             elementType={product.config.elementType}
//             elementConfig={product.config.elementConfig}
//             value={product.config.value}
//             changed={( event ) => inputChangedHandler( event, product.id )} />
//     ));
    let form = productsList.map(product => (
            <Card key={product._id} className="card">
                <Card.Img className="card-img-top" variant="top" src={product.picture} />
                <Card.Body className="card-body">
                    <Card.Text><strong>Name: </strong>{product.product}</Card.Text>
                    <Card.Text><strong>Brand: </strong>{product.brand}</Card.Text>
                    <Card.Text><strong>Price: </strong>{product.price}</Card.Text>
                    <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                </Card.Body>
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
            <div className="row">
                <form>
                  {form}
                    <div className="col">
                        <Button onClick={(event) => editHandler(event.target.params.id)} className="btn btn-info ">EDIT</Button>
                    </div>
                    <div className="col">
                        <Button onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
                    </div>
                        {/* <Button className="btn btn-success">ENVIAR</Button> */}
                </form>
            </div>
        </div>
    );
    
});

export default productsController;