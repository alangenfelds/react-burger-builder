import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = ( props ) => {
    return (
        <div className={classes.BuildControls}>
        <p>Burger price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(el => (
                <BuildControl 
                    added={() => props.ingredientAdded(el.type)}
                    removed={ ()=> props.ingredientRemoved(el.type) }
                    key={el.label} 
                    label={el.label} 
                    type={el.type} 
                    disabled={props.disabled[el.type]}/>
            ))}
            {/* <button className={classes.OrderButton} disabled={props.price === 4.0}>ORDER NOW</button> */}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW
            </button>
        </div>
    );
}

export default buildControls;