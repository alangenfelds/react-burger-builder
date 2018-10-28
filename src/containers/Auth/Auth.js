import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions';

class Auth extends Component {

    state = {
        controls: {
                email: {
                    elementType: "input",
                    elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                    },
                    value: "",
                    valueType: "Email",
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: "input",
                    elementConfig: {
                      type: "password",
                      placeholder: "Password"
                    },
                    value: "",
                    valueType: "Password",
                    validation: {
                        required: true,
                        minLength: 7
                    },
                    valid: false,
                    touched: false
                  },
        },
        isSignup: false

    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (!rules) return true;
    
        if (rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
    
        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isEmail) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }
    
        return isValid;
      }


      inputChangedHandler = (event, controlName) => {
        const updatedControlsForm = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            controls: updatedControlsForm
        });

      };

      submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
      }

      switchAuthModeHandler = () => {
          this.setState(prevState => {
              return {
                  isSignup: !prevState.isSignup
              }
          })
      }


    render () {
        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath} />
        }

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
    
        let form = formElementsArray.map(el => (
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
                    />)
            );
    
        if (this.props.loading) {
            form = <Spinner />
        }
        
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{'color': 'red'}}>{ this.props.error.message }</p>
            )
        }

        return (
            <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
                {form}
                {errorMessage}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                        SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
            </Button>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/') )

    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);