
let pokemonRepository = (function () { // iife (to separate the variables inside from outside)
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

// v2 of the add function: MUCH BETTER, old version is just still active because I want to understand why it doesn't work correctly
  function add_v2(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      alert("Pokemon format is not correct! Correct example: \{name: \'Pokemax\', height: 1.3, type: \[\'fairy\', \'tale\'\]\}");
    }
  }

//  function remove(index){
//    // not implemented yet (may 'name' is better than 'index' > indexOf() )
//  }
// function findPokemon(name) {
//   // not implemented yet
//   filter() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// }

  function addListItem(pokemon) {
    let repoList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('repoItemButton');
    listItem.appendChild(button);
    repoList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    // remove: remove,
    // filter: findPokemon,
    // printRepo: printRepository(pokemonList)
  }
})();

// print a list of the pokemon (with their height) into the DOM

// v4 of pokemon list. Almost like v3, but shorter
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});

// v3 of the pokemon list with adding list elements and buttons to the DOM
// function printRepository(list) {
//   list.forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon);
//   });
// }
// printRepository(pokemonRepository.getAll());

// v2 of the pokemon list with forEach & document.write
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
