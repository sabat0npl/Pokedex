let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');
    let count;
    let id;
    let pokemonList = [];
    let page = 0;
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${0+page*8}`;

    // Functions to work with modal

    function hideModal() { // this function is used to hidding modal
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => { // function to close modal with ESC key
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => { // eventlistner to close modal when clicking outside
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // Functions to Fetch data from API

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item, i) {
                let pokemon = {
                    pokemonIndex: i + 1 + (page * 9),
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                clearDisplay();
                return count = item.count;
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
            console.log(details)
            if (details == "") {
            // Now we add the details to the item
            item.pokemonIndex = details.id;
            item.name = details.name;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            details.types.forEach(function (object) {
                return item.types.push(object.type.name)
            });
            item.abilities = [];
            details.abilities.forEach(function (object) {
                return item.abilities.push(object.ability.name)
            })};
        }).catch(function (e) {
            alert(error(e));
        });
    }

    function showLoadingMessage() { // A message showed while fetching data
        let container = document.querySelector(".display");
        let loadingMessage = document.createElement("h1");
        loadingMessage.innerText = "The data are being downloaded"
        container.appendChild(loadingMessage);
    }

    function getAll() { // the way to get access to pokemonList data
        return pokemonList;
    }

    function add(item) { // function to add items to array with pokemons
        pokemonList.push(item);
    }

    // Search function

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.pokemonIndex = details.id;
            item.name = details.name;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            details.types.forEach(function (object) {
                return item.types.push(object.type.name)
            });
            item.abilities = [];
            details.abilities.forEach(function (object) {
                return item.abilities.push(object.ability.name)
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    document.querySelector("#search").addEventListener("click", function () { // Eventlistener for Search function
        let pokemonNamePrompt = window.prompt("What is the name of Pokemon you are looking for:").toLowerCase();
        let pokemon = {
            name: pokemonNamePrompt,
            detailsUrl: `https://pokeapi.co/api/v2/pokemon/${pokemonNamePrompt}`
        }
        showDetails(pokemon);
    });

    function addListItem(pokemon) { // function to print an item from the list on the screen
        let pokemonListDisplay = document.querySelector(".display");
        let listItem = document.createElement("button");
        let pokemonImage = document.createElement("img");
        let pokemonName = document.createElement("p");
        listItem.classList.add("pokemon-list__item");
        pokemonImage.classList.add("pokemon-list__image");
        pokemonImage.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokemonIndex}.png`);
        pokemonName.innerText = pokemon.name;
        pokemonName.classList.add("pokemon-item__name");
        listItem.addEventListener("click", function () { // I am runing a showDetails function wrapped in function so it runs only after clik and not immediately
            showDetails(pokemon);
        });
        listItem.appendChild(pokemonImage);
        listItem.appendChild(pokemonName);
        pokemonListDisplay.appendChild(listItem);
    }

    function clearDisplay() { // its clear the display containe in preparation for new data
        let container = document.querySelector(".display");
        while (container.lastChild) {
            container.removeChild(document.querySelector(".display").lastChild);
        }
    }

    function showDetails(pokemon) { // a function that is showing the details of the pokemon after chosing one from the list
        id = pokemon.pokemonIndex;
        loadDetails(pokemon).then(function () {
            let container = document.querySelector(".display");
            clearDisplay();
            let pokemonImage = document.createElement("img");
            pokemonImage.classList.add("details-foto");
            pokemonImage.setAttribute("src", (`https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokemonIndex}.png`));
            container.appendChild(pokemonImage);
            let pokemonName = document.createElement("h1");
            pokemonName.classList.add(pokemon.pokemonIndex);
            container.appendChild(pokemonName);
            pokemonName.innerText = `#${pokemon.pokemonIndex} ${pokemon.name}`;
            let description = document.createElement("div");
            description.classList.add("description");
            container.appendChild(description);
            let size = document.createElement("div");
            size.classList.add("size");
            description.appendChild(size);
            let sizeH = document.createElement("p");
            sizeH.innerHTML = `Height <span> ${pokemon.height} </span>`;
            size.appendChild(sizeH);
            let sizeW = document.createElement("p");
            sizeW.innerHTML = `Weight <span> ${pokemon.weight} </span>`;
            size.appendChild(sizeW);
            let abilities = document.createElement("p");
            abilities.classList.add("description-header");
            abilities.innerText = "Abilities";
            description.appendChild(abilities);
            let abilitiesDiv = document.createElement("div");
            abilitiesDiv.classList.add("abilities");
            pokemon.abilities.forEach(function (ability) {
                let abilityP = document.createElement("p");
                abilityP.innerText = ability;
                abilitiesDiv.appendChild(abilityP);
            })
            description.appendChild(abilitiesDiv);
            let typeDiv = document.createElement("div");
            typeDiv.classList.add("type");
            pokemon.types.forEach(function (type) {
                let buttonType = document.createElement("button");
                buttonType.classList.add(type);
                buttonType.innerText = type;
                typeDiv.appendChild(buttonType);
            })
            container.appendChild(typeDiv);
            if (pokemon.evolution != undefined) {
                let evolutionLineTitle = document.createElement("p");
                evolutionLineTitle.innerText = "Evolution Line";
                container.appendChild(evolutionLineTitle);
                let evolutionLineDiv = document.createElement("div");
                evolutionLineDiv.classList.add("evolution");
                pokemon.evolution.forEach(function (evolution) {
                    let evoImg = document.createElement("img");
                    evoImg.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${evolution}.png`);
                    evolutionLineDiv.appendChild(evoImg);
                })
                container.appendChild(evolutionLineDiv);
            }
        })
    }

    function filterType(types) { // function to filter pokemons by Type
        clearDisplay();
        return pokemonList.filter(function (pokemon) {
            return pokemon.types.includes(types) ? true : false;
        });
    }

    document.querySelector("#filter").addEventListener("click", function () { // event listener for filterType function
        let types = window.prompt("What is the type of Pokemons you are looking for:").toLowerCase().split(",");
        console.log(types);
        filterType(types) == "" ? alert("We dont have this kind of Pokemon in our Database") :
            pokemonRepository.filterType(type).forEach(function (element) {
                return pokemonRepository.addListItem(element)
            })
    });

    // function that removes a pokemon from the list
    function remove() {
        return pokemonList = pokemonList.filter(pokemon => pokemon.pokemonIndex !== id)
    }

    // function to edit a pokemon
    function edit(pokemonEdited) {
        pokemonList[id - 1] = pokemonEdited;
    }

    // function to validate the pokemon 
    function pokemonValidate(pokemon) {
        if (typeof (pokemon) === 'object') {
            if (typeof (pokemon.name) !== 'string') {
                return 'Your pokemon should have a name'
            } else if (typeof (pokemon.height) !== 'number') {
                return 'Your pokemon should have a height and it should be a number'
            } else if (typeof (pokemon.weight) !== 'number') {
                return 'Your pokemon should have a weight and it should be a number'
            } else if (typeof (pokemon.abilities) !== 'string') {
                return 'Your pokemon should have abilities (you should separate them by comma)'
            } else if (!pokemon.types.find(type => (type === 'fire' || type === 'flying' || type === 'grass' || type === 'electric' || type === 'water' || type === 'other'))) {
                return 'Your pokemon types should have one of theses (fire, flying, grass, electric, water, other)'
            } else {
                return null
            }
        } else {
            return 'Ups, this is not a pokemon'
        }
    }

    document.querySelector('.form__pokemon').onsubmit = e => {
        e.preventDefault();
        document.getElementById("form__pokemon").classList.add('hidden');
        const listContainer = document.querySelector('.pokemon__list')
        const name = document.getElementById('input-name').value
        const height = parseFloat(document.getElementById('input-height').value)
        const weight = parseFloat(document.getElementById('input-weight').value)
        const types = document.getElementById('input-type').value.split(',')
        const abilities = document.getElementById('input-abilities').value.split(',')
        if (document.querySelector('.form__pokemon').querySelector('button').innerHTML === 'Add a new Pokemon') {
            const sended = add({
                pokemonIndex: pokemonList.length + 1,
                name: name,
                height: height,
                weight: weight,
                type: types,
                abilities: abilities
            });
            clearDisplay();
            getAll().forEach(function (pokemon, i) {
                addListItem(pokemon, i);
            })
            console.log(pokemonList);
        } else {
            const pokemonEdited = edit({
                pokemonIndex: id,
                name: name,
                height: height,
                weight: weight,
                type: types,
                abilities: abilities
            })
            clearDisplay();
            getAll().forEach(function (pokemon, i) {
                addListItem(pokemon, i);
            })

        }
    }





    document.querySelector("#add").addEventListener("click", function () {
        modalContainer.classList.add('is-visible');
        const pokemonForm = document.querySelector('.form__pokemon')
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.querySelector('button').innerText = 'Add a new Pokemon';
    });

    document.querySelector("#delete").addEventListener("click", function () {
        remove();
        clearDisplay();
        getAll().forEach(function (pokemon, i) {
            addListItem(pokemon, i);
        })
    });

    document.querySelector("#edit").addEventListener("click", function () {
        modalContainer.classList.add('is-visible');
        const pokemonForm = document.querySelector('.form__pokemon')
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.querySelector('button').innerText = 'Edit a Pokemon';
    });

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.pokemonIndex = details.id;
            item.name = details.name;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            details.types.forEach(function (object) {
                return item.types.push(object.type.name)
            });
            item.abilities = [];
            details.abilities.forEach(function (object) {
                return item.abilities.push(object.ability.name)
            });
        }).catch(function (e) {
            console.error(e);
        });
    }



    getAll().forEach(function (pokemon, i) {
        addListItem(pokemon, i);
    })

    return {
        loadDetails: loadDetails,
        loadList: loadList,
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        filterType: filterType,
        remove: remove,
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    for (let i = 0; i < 9; i++) {
        pokemonRepository.addListItem(pokemonRepository.getAll()[i]);
    };
});