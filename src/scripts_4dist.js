
let pokemonRepository = (function () { // IIFE
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

  function getAll() {
    return pokemonList;
  }

  // add pokemon to repository
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // filter the list of pokemon
  let searchInput = document.querySelector("#filter_pokemons");
  //add event listener to search bar
  searchInput.addEventListener("input", function () {
    let listPokemon = document.querySelectorAll("li");
    let value = searchInput.value.toUpperCase();

    listPokemon.forEach(function (pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    });
  });

  // creating a button as li element for each pokemon
  function addListItem(pokemon) {

    let repoList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success', 'mb-2', 'text-center');
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonDetailsModal")
    listItem.appendChild(button);
    repoList.appendChild(listItem);
    buttonClick(button, pokemon); //add the eventListener    
  }

  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map(value => (' ' + value.type.name));
      item.abilities = details.abilities.map(value => (' ' + value.ability.name));
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // empty the modal
    modalBody.empty();
    modalTitle.empty();

    let name = $('<h2>' + item.name + '</h2>');
    let imgFront =$("<img class='modal-img' style='width:50%' alt='front of " + item.name + "' " + ">");
    imgFront.attr('src', item.imageUrlFront);
    let imgBack =$("<img class='modal-img' style='width:50%' alt='back of " + item.name + "' " + ">");
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
    // remove: remove
  }
})(); // End if IIFE

// print a list of the pokemon into the DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
