import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import Aux from "../../hoc/_aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actionTypes from '../../store/actions';
import * as burgerBuilderActions from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    // loading: false,
    // error: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
    // console.log(this.props);
    // axios
    //   .get("https://react-my-burger-2471f.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     this.setState({
    //       ingredients: res.data
    //     });
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     this.setState({
    //       error: true
    //     });
    //   });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let key in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]))
    // }
    // queryParams.push('price='+this.state.totalPrice);
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search : '?'+queryString
    this.props.history.push('/checkout');
   
  };

  updatePurchasebleState(ingredients) {

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasebleState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
