
let pokemonRepository = (function () { // IIFE (to separate the variables inside from outside)
  let pokemonList = [
   // {name:"Butterfree", height:1.1 , type: ["bug", "flying"]},
   // {name:'Paras', height:0.3 , type:["grass", "bug"]},
   // {name:'Mr. Mime', height:1.3 , type:["psychic", "fairy"]},
  ];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

  function getAll() {
    return pokemonList;
  }

// v3 of the add function - no validation because pokemons are added automatically from API
function add(pokemon) {
  pokemonList.push(pokemon);
}

//  function remove(name){
//    // not implemented yet > indexOf(name)
//  }
// function findPokemon(name) {
//   // not implemented yet
//   filter() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// }

  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(){
      showDetails(pokemon);
      // add/toggle the class='active' to the button ? > remove it when modal is closed
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // creating a button as li element for each pokemon
  function addListItem(pokemon) {
    
    /* DRAFT for jQuery & Bootstrap version
    let repoList = $('.pokemon-list');
    let button = $('<button type="button">' + pokemon.name + '</button>');
    button.addClass('repoItemButton', 'list-group-item', 'list-group-item-action', 'btn', 'btn-info', 'text-center', 'col-3');
    let listItem = $('<li></li>');
    listItem.append(button);
    repoList.append(listItem);

    buttonClick(button, pokemon); //add the eventListener
    */

    let repoList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('repoItemButton', 'list-group-item', 'list-group-item-action', 'btn', 'btn-info', 'text-center');
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonDetailsModal")
    listItem.appendChild(button);
    repoList.appendChild(listItem);
    buttonClick(button, pokemon); //add the eventListener    
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
      // item.imageUrl = details.sprites.front_default;
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map(value => value.type.name);
      item.abilities = details.abilities.map(value => value.ability.name);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');

    // empty the modal
    modalBody.empty();
    modalTitle.empty();

    let name = $('<h1>' + item.name + '</h1>');
    let imgFront =$("<img class='modal-img' style='width:50%'>");
    imgFront.attr('src', item.imageUrlFront);
    let imgBack =$("<img class='modal-img' style='width:50%'>");
    imgBack.attr('src', item.imageUrlBack);
    let height = $("<p>" + 'Height: ' + item.height + '</p>');
    let weight = $('<p>' + 'Weight: ' + item.weight + '</p>')
    let types = $('<p>' + 'Types: ' + item.types + '</p>');
    let abilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    modalTitle.append(name);
    modalBody.append(imgFront);
    modalBody.append(imgBack);
    modalBody.append(height);
    modalBody.append(weight);
    modalBody.append(types);
    modalBody.append(abilities);
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
})(); // End if IIFE

// print a list of the pokemon into the DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
