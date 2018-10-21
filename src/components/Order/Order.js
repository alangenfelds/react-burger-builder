import React from "react";

import classes from "./Order.css";

const order = props => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: "capitalize",
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
         key={ig.name}>{ig.name} ({ig.amount}) </span>
    })

    // let transformedIngredients = Object.keys( props.ingredients )
    // .map( ingredientKey => {
    //     // creating array with length of ingredient value
    //     return [...Array( props.ingredients[ingredientKey] )].map( (_, i) => {
    //         return <BurgerIngredient key={ingredientKey + i} type = {ingredientKey} />
    //     } );
    // } ).reduce((arr, el) => {
    //     return arr.concat(el)
    // }, []);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
