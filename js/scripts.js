let pokemonList = [
  {name:"Butterfree", height:1.1 , type: ["bug", "flying"]},
  {name:'Paras', height:0.3 , type:["grass", "bug"]},
  {name:'Mr. Mime', height:1.3 , type:["psychic", "fairy"]},
];

// print a list of the pokemon (with their height) into the DOM
for (let i=0; i<pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
}
