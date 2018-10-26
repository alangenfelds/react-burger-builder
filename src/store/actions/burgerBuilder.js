import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (ingrName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingrName
    };
}

export const removeIngredient = (ingrName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingrName
    };
};

export const setIngredients = (ingredients) => {
    // Synchronous action
    return {
        type: actionTypes.SET_INGREDIENTS,
        ings:  ingredients
    };
};

export const initIngredients = () => {
    // Async action
    return dispatch => {
        axios
        .get("https://react-my-burger-2471f.firebaseio.com/ingredients.json")
        .then(res => {
            dispatch(setIngredients(res.data))
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed())
        });
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}