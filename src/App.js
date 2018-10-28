import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //--------------------------------- Higher-order Functions-----------------------------------------------------------
    // var triple = (x) => (console.log('triple(' + x + ') = ', 3 * x));
    // triple(10);

    // var animals = [
    //   {name: 'Fluffykins', species: 'rabbit'},
    //   {name: 'Caro', species: 'dog'},
    //   {name: 'Hamilton', species: 'dog'},
    //   {name: 'Harold', species: 'fish'},
    //   {name: 'Ursula', species: 'cat'},
    //   {name: 'Jimmy', species: 'fish'}
    // ]

    // 1. Filter

    // var dogs = [];
    // for (var i = 0; i < animals.length ; i++) {
    //   if(animals[i].species === 'dog')
    //       dogs.push(animals[i])
    // }

    // var dogs = animals.filter( (animal) => {
    //   return animal.species === 'dog'
    // });

    // var dogs = animals.filter( (animal) => animal.species === 'dog');

    // var isDog = (animal) => animal.species === 'dog';
    // var isNotDog = (animal) => animal.species !== 'dog';
    // var dogs = animals.filter( isDog );
    // var otherAnimals = animals.filter( isNotDog );

    // console.log('dogs', dogs);
    // console.log('otherAnimals', otherAnimals);

    // 2. MAP

    //var names = []
    // for (var i = 0; i < animals.length ; i++) {
    //       names.push(animals[i].name)
    // }

    // var names = animals.map( (animal) => animal.name )

    // console.log('names', names);

    // create 15 empty object in JS way
    // var defaultExpanded=[...Array(15)].map( () => ({}) ) ;
    // console.log(defaultExpanded);

    //-----------------------------------------------------------------------------------------------------------------

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
      </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
