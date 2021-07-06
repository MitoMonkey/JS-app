
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
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // console.log(pokemon);
      let modalText = 'Height: ' + pokemon.height;
      // <img src="http://wikipedia.com/static/favicon/wikipedia.ico" alt="Wikipedia Favicon"></img>
      showModal(pokemon.name, modalText, pokemon.imageUrl);
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject; // set in the showDialog function

  function showModal(title, text, imgUrl) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    imgElement.alt = 'picture of' + title;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
    
    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) { // use the modal and extend it to show a dialog
    showModal(title, text); // argument "imgUrl" may be missing
    let modal = modalContainer.querySelector('.modal');
    
    // add a confirm and cancel button to the modal
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';
  
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';
  
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
  
    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });
    
      // This can be used to reject from the hideModal function
      dialogPromiseReject = reject;

      /* depricated v1 - Problem with this: if the user closes the modal without confirming or canceling (e.g., with the Esc key or Close button), the promise will neither resolve nor reject.
      cancelButton.addEventListener('click', () => {
        hideModal();
        reject();
      }); 
      confirmButton.addEventListener('click', () => {
        hideModal();
        resolve();
      })
      */

    });
  }

  /* 
  // these test buttons are deactivated. Modal should show when user clicks on a pokemon.
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
        alert('confirmed!'); // What could happen here next is to send a DELETE request to the server
      }, () => {
        alert('not confirmed');
      });
  });
  */

  // hide the modal when user presses ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  // hide the modal when a user clicks in the container (outside the modal)
  modalContainer.addEventListener('click', (e) => {
    // This is also triggered when clicking INSIDE the modal
    // But we only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
