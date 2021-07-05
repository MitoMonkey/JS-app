
// INSIDE THE IIFE
/*   function add_v1(newPokemon) { // this first attemt is not in use anymore, but kept here for documentation
    let expectedKeys = ["name", "height", "type"];
    let newPokeKeys = Object.keys(newPokemon);
    let areArraysEqual = true;

    // validate the datatype of the new pokemon
    if (typeof newPokemon !== 'object') {
      alert('Wrong datatype. Your new Pokemon needs to be an object.');
      areArraysEqual = false;
    }

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

    // To avoid double alerts when a key is wrong, the some() method could be used instead of forEach(). See https://www.w3schools.com/jsref/jsref_some.asp

    if (areArraysEqual) { pokemonList.push(newPokemon); }
  } */

// Example how to add a new Pokemon: pokemonRepository.add({name: 'testpoke', height: 4, type: "banana"});

/* 
// v2 of the add function - much shorter format validation
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      alert("Pokemon format is not correct! Correct example: \{name: \'Pokemax\', height: 1.3, type: \[\'fairy\', \'tale\'\]\}");
    }
  }
*/
// OUTSIDE THE IIFE

// v4 of pokemon list. Almost like v3, but shorter
// pokemonRepository.getAll().forEach(function(pokemon){
//   pokemonRepository.addListItem(pokemon);
// });

// v3 of the pokemon list with adding list elements and buttons to the DOM
// function printRepository(list) {
//   list.forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon);
//   });
// }
// printRepository(pokemonRepository.getAll());

/*
// v2 of the pokemon list with forEach & document.write - DEPRICATED
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
*/

// v1 of the pokemon list with a for loop:
  // for (let i=0; i<list.length; i++) {
  //   if (list[i].height > 1.2){
  //     bigComment = ' - Wow, that’s big!';
  //   }
  //   else {
  //     bigComment = '';
  //   }
  //   document.write('<li>' + list[i].name + ' (height: ' + list[i].height + ')' + bigComment + '</li>');
  // }