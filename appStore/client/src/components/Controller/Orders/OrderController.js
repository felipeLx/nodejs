import React, { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import api from '../../../api/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const orderController = React.memo(props => {
    
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const getOrderHandler = async() => {
            const checkedOrder = await api.getOrderById(props.userId)
                            .then(order => setOrderList(order))
                            .catch(err => console.log(err));
            console.log(checkedOrder);
        };
        getOrderHandler();
    }, [props.userId]);
    
    

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

    let form = orderList.map(order => (
        <Card key={order._id} className="card">
            <Card.Body className="card-body">
                <Card.Text><strong>ID:</strong> {order._id}</Card.Text>
                <Card.Text><strong>Produto Id:</strong> {order.productId}</Card.Text>
            </Card.Body>
            <ButtonGroup>
                <Button type="button" onClick={(event) => editHandler(event.target.params.id)} className="btn btn-info btn-space">EDIT</Button>
                <Button type="button" onClick={(event) => deleteHandler(event.target.params.id)} className="btn btn-danger btn-space">DELETE</Button>
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token || state.sigunp.token,
        userId: state.auth.userId || state.sigunp.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch( actions.fetchOrders(token, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( orderController, axios ) );