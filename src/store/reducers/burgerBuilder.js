import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 0.7
  };

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
};

// also we can refactor by extracting functions to make switch-case leaner
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        // refactored version - using utility function
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
            // const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
            // const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
            // const updatedState = {
            //     ingredients: updatedIngredients,
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // }
            // return updateObject(state, updatedState);
        
        // original version - without use of utility function
        case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] -1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
        };

        case actionTypes.SET_INGREDIENTS:
        return updateObject(state, {
                            ingredients: {
                                salad: action.ings.salad,
                                bacon: action.ings.bacon,
                                cheese: action.ings.cheese,
                                meat: action.ings.meat,
                              },
                            error: false,
                            totalPrice: 0,
                            building: false
                            })
     

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true} );

        default:
            return state;
    }
};

export default reducer;