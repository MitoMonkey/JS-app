
let pokemonRepository = (function () { // IIFE (to separate the variables inside from outside)
  let pokemonList = [
   // {name:"Butterfree", height:1.1 , type: ["bug", "flying"]},
   // {name:'Paras', height:0.3 , type:["grass", "bug"]},
   // {name:'Mr. Mime', height:1.3 , type:["psychic", "fairy"]},
  ];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

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
      "detailsUrl" in pokemon
      // "height" in pokemon &&
      // "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      alert("Pokemon format is not correct! Correct example: \{name: \'Pokemax\', height: 1.3, type: \[\'fairy\', \'tale\'\]\}");
    }
  }
*/

// v3 of the add function - no validation because pokemons are added automatically from API
function add(pokemon) {
  pokemonList.push(pokemon);
}

//  function remove(index){
//    // not implemented yet (may 'name' is better than 'index' > indexOf() )
//  }
// function findPokemon(name) {
//   // not implemented yet
//   filter() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// }

  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // creating a button as li element for each pokemon
  function addListItem(pokemon) {
    let repoList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('repoItemButton');
    listItem.appendChild(button);
    repoList.appendChild(listItem);
    buttonClick(button, pokemon);
  }

// load the list of pokemon from the API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    // remove: remove,
    // filter: findPokemon,
    // printRepo: printRepository(pokemonList)
  }
})();

// print a list of the pokemon into the DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

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
