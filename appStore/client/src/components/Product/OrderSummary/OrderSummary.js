import React, { useEffect } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = React.memo(props => {
    
    useEffect(() => {
        totalHandler();
    }, []);

    let totalHandler = () => (
        props.productsList.map((el, index) => el.products.total)
                    .reduce((acc, cur, idx, arr) => {
                        return acc + cur;
                    }, 0)
    );

    let resume = (
        props.productsList.map(res => {
            return (
                <p key={res._id} style={{ textTransform: 'capitalize' }}>
                R$ {res.products.total.toFixed(2)}: {res.products.name}</p>
            )}
        )
    );

    return(
        <>
            <section>
                
                <h5>Sua lista de compras totaliza: <strong>R$ {totalHandler().toFixed(2)}</strong></h5>
                    {resume} 
                    <p style={{padding: '10px 5px 10px 0'}}>Continue para o Checkout?<i className="fas fa-dolly"></i></p>
                    <Button btnType="danger" clicked={props.purchaseCancelled}>CANCELAR</Button>
                    <Button btnType="success" clicked={props.purchaseContinued}>CONTINUAR</Button>
            </section>
        </>
    );
});


export default orderSummary;