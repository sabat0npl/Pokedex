let pokemonRepository = (function () {
    let count;
    let id;
    let pokemonList = [];
    let page = 0;
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${0+page*8}`;

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item, i) {
                count = item.count;
                let pokemon = {
                    pokemonIndex: i + 1 + (page * 9),
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                clearDisplay();
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showLoadingMessage() {
        let container = document.querySelector(".display");
        let loadingMessage = document.createElement("h1");
        loadingMessage.innerText = "The data are being downloaded"
        container.appendChild(loadingMessage);
    }

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    function biggestPokemon() {
        let huge = 0; // initiating a variable used to find the biggest pokemon
        pokemonList.forEach(function (pokemon, i) {
            pokemonList[huge].height < pokemon.height ? huge = i : huge = huge; // I have corrected this logic, it was wasn't working good
        })
        return pokemonList[huge].name
    } // function to find the bigges Pokemon

    function findPokemon(name) {
        return pokemonList.filter(function (pokemon) {
            return pokemon.name === name ? true : false;
        });
    }

    function addListItem(pokemon) {
        let pokemonListUl = document.querySelector(".display");
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
        pokemonListUl.appendChild(listItem);
    }

    function clearDisplay() {
        let container = document.querySelector(".display");
        while (container.lastChild) {
            container.removeChild(document.querySelector(".display").lastChild);
        }
    }

    function showDetails(pokemon) {
        id = pokemon.pokemonIndex;
        if (!pokemon) {
            return window.alert("We dont have this pokemon in our database");
        }
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
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
            console.log(id);
        })

    }

    function filterType(type) {
        clearDisplay();
        return pokemonList.filter(function (pokemon) {
            return typeof type !== typeof "string" ? (pokemon.type === type ? true : false) : (pokemon.type.includes(type) ? true : false);
        });
    }

    // function that removes a pokemon from the list
    function remove() {
        return pokemonList = pokemonList.filter(pokemon => pokemon.id !== id)
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
                id: pokemonList.length + 1,
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
                id: id,
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

    document.querySelector("#search").addEventListener("click", function () { // I am runing a showDetails function wrapped in function so it runs only after clik and not immediately
        let pokemon = window.prompt("What is the name of Pokemon you are looking for:").toLowerCase();
        pokemon = pokemon[0].toUpperCase() + pokemon.slice(1);
        pokemonRepository.showDetails(pokemonRepository.findPokemon(pokemon ? pokemon : null)[0])
    });

    document.querySelector("#filter").addEventListener("click", function () { // I am runing a showDetails function wrapped in function so it runs only after clik and not immediately
        let type = window.prompt("What is the type of Pokemons you are looking for:").toLowerCase();
        type = type[0].toUpperCase() + type.slice(1);
        pokemonRepository.filterType(type) == "" ? alert("We dont have this kind of Pokemon in our Database") :
            pokemonRepository.filterType(type).forEach(function (element) {
                return pokemonRepository.addListItem(element)
            })
    });

    document.querySelector("#add").addEventListener("click", function () {
        const pokemonForm = document.querySelector('.form__pokemon')
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.classList.remove('hidden')
        pokemonForm.querySelector('button').innerText = 'Add a new Pokemon';
    });

    document.querySelector("#delete").addEventListener("click", function () {
        pokemonRepository.remove();
        pokemonRepository.clearDisplay();
        pokemonRepository.getAll().forEach(function (pokemon, i) {
            pokemonRepository.addListItem(pokemon, i);
        })
    });

    document.querySelector("#edit").addEventListener("click", function () {
        const pokemonForm = document.querySelector('.form__pokemon')
        document.querySelectorAll('input').forEach(el => el.value = '')
        pokemonForm.classList.remove('hidden')
        pokemonForm.querySelector('button').innerText = 'Edit a Pokemon';
    });

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
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
        biggestPokemon: biggestPokemon,
        findPokemon: findPokemon,
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