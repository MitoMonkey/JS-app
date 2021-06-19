let pokemonList = [
  {name:"Butterfree", height:1.1 , type: ["bug", "flying"]},
  {name:'Paras', height:0.3 , type:["grass", "bug"]},
  {name:'Mr. Mime', height:1.3 , type:["psychic", "fairy"]},
];

// print a list of the pokemon (with their height) into the DOM
let bigComment = '';
for (let i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height > 1.2){
    bigComment = ' - Wow, that’s big!';
  }
  else {
    bigComment = '';
  }
  document.write('<li>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + bigComment + '</li>');
}
