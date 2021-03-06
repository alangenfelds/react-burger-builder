import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        valueType: "Name",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        valueType: "Street name",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal code"
        },
        value: "",
        valueType: "Postal code",
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        valueType: "Country name",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        valueType: "E-Mail address",
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ings);
    const formData = {};

    for (let key in this.state.orderForm) {
        formData[key] = this.state.orderForm[key].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice.toFixed(2),
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {

    // const updatedOrderForm = {
    //     ...this.state.orderForm
    // }

    // const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // updatedFormElement.value = event.target.value;
    
    // updatedFormElement.touched = true;

    // updatedFormElement.valid = 
    //   this.checkValidity(updatedFormElement.value,updatedFormElement.validation)

    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value : event.target.value,
      touched : true,
      valid : checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation)
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    
    
    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({
        orderForm: updatedOrderForm,
        formIsValid: formIsValid
    })
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        })
    }


    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(el => {
            return(
            <Input 
                key={el.id} 
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig} 
                value={el.config.value} 
                valueType={el.config.valueType}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event, el.id)}
                />
                );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaceBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
