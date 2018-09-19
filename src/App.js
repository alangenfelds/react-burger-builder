import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
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

    //-----------------------------------------------------------------------------------------------------------------

    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
