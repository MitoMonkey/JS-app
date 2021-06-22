let pokemonRepository = (function () { // iife
  let pokemonList = [
    {name:"Butterfree", height:1.1 , type: ["bug", "flying"]},
    {name:'Paras', height:0.3 , type:["grass", "bug"]},
    {name:'Mr. Mime', height:1.3 , type:["psychic", "fairy"]},
  ];

  function getAll() {
    return pokemonList;
  }

  function add(newPokemon) {
    let expectedKeys = ["name", "height", "type"];
    let newPokeKeys = Object.keys(newPokemon);
    let areArraysEqual = true;

    // validate the datatype of the new pokemon
    if (typeof newPokemon !== 'object') {
      alert('Wrong datatype. Your new Pokemon needs to be an object.');
      areArraysEqual = false;
    }

    // validate if all 3 keys are defined (alternative: a counter in the forEach loop > compare the count at the end to expectedKeys.length)
    // if (newPokeKeys.length !== expectedKeys.length) {
    //   alert('You need to specify all 3 attributes of you Pokemon: name, height and type.');
    //   let areArraysEqual = false;
    //   return;
    // }

    // validate if the individual keys of the new pokemon are correct
    newPokeKeys.forEach(function(key) {
      if (!expectedKeys.includes(key)) {
        alert('\"' + key + '\" is not a valid attribute for your Pokemon! (Correct example: \{name: \'Pokemax\', height: 1.3, type: \[\'fairy\', \'tale\'\]\} )');
        areArraysEqual = false;
      }
    });

    // validation if all expected keys are set
    expectedKeys.forEach(function(key) {
      if (!newPokeKeys.includes(key)) {
        alert('You need to specify the \"' + key + '\" of your new Pokemon! (Correct example: \{name: \'Pokemax\', height: 1.3, type: \[\'fairy\', \'tale\'\]\} )');
        areArraysEqual = false;
      }
    });

    if (areArraysEqual = true) { pokemonList.push(newPokemon); }
  }
// Example how to add a new Pokemon: pokemonRepository.add({name: 'testpoke', height: 4, type: "banana"});

//  function remove(index){
//    // not implemented yet (may 'name' is better than 'index' > indexOf() )
//  }
// function findPokemon(name) {
//   // not implemented yet
//   filter() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// }

  return {
    getAll: getAll,
    add: add
    // remove: remove,
    // filter: findPokemon,
    // printRepo: printRepository(pokemonList)
  }
})();

// print a list of the pokemon (with their height) into the DOM
function printRepository(list) {
  let bigComment = '';
  list.forEach(function(pokemon) {
    if (pokemon.height > 1.2){
      bigComment = ' - Wow, that’s big!';
      }
      else {
        bigComment = '';
      }
    document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ')' + bigComment + '</li>');
  });
}
printRepository(pokemonRepository.getAll());

// old version of the pokemon list with a for loop:
  // for (let i=0; i<list.length; i++) {
  //   if (list[i].height > 1.2){
  //     bigComment = ' - Wow, that’s big!';
  //   }
  //   else {
  //     bigComment = '';
  //   }
  //   document.write('<li>' + list[i].name + ' (height: ' + list[i].height + ')' + bigComment + '</li>');
  // }

function divide(dividend, divisor){
  if (divisor === 0) {return "You are trying to devide by zero!";}
  else {
    return dividend / divisor;
    // let result = dividend / divisor;
    // return result;
    }
}
