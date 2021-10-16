import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    // console.log(props);
    const { total,quantity, disabled } = props;

    return (
    <div>
        {/* <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>-</button>
        <button 
            className={classes.More} 
            onClick={props.added}>+</button>
        */}
        <div className={classes.DinamicFields}>
            <div>
                <p><strong>Quantidade: {quantity}</strong></p>
            </div>
            <div>
                <p><strong>Total: R$ {total}</strong></p>
            </div>
        </div> 
        
    </div>
    )
    };

export default buildControl;