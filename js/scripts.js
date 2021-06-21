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
    pokemonList.push(newPokemon); // validation of data format required
  }
  function remove(index){
  //  pokemonList.push(newPokemon); // not implemented yet (may name is better than index > indexOf() )
  }
  return {
    getAll: getAll,
    add: add,
    remove: remove,
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


// pokemonRepository.add({name: 'testpoke', height: 4, type: "banana"});




function divide(dividend, divisor){
  if (divisor === 0) {return "You are trying to devide by zero!";}
  else {
    return dividend / divisor;
    // let result = dividend / divisor;
    // return result;
    }
}
