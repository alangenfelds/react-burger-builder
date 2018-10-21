import React from "react";
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {

    // ----------------------REDUCE TRAINING ---------------------
    // var orders = [
    //     {amount :11},
    //     {amount :22},
    //     {amount :33},
    //     {amount :64},
    // ]

    // var totalAmount = 0
    // for(var i = 0; i < orders.length; i++) {
    //     totalAmount +=orders[i].amount
    // }

    // var totalAmount = orders.reduce( (sum, order) => {
    //     console.log(sum);
    //     return sum + order.amount
    // }, 0)

    // console.log('totalAount = ' + totalAmount)


    // ----------------------REDUCE TRAINING ---------------------

    console.log(props);

    //getting array of ingredients object keys
    let transformedIngredients = Object.keys( props.ingredients )
        .map( ingredientKey => {
            // creating array with length of ingredient value
            return [...Array( props.ingredients[ingredientKey] )].map( (_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type = {ingredientKey} />
            } );
        } ).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please add ingredients!</p>
        }

        // console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);