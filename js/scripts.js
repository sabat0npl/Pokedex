let pokemonRepository = (function () {
    let pokemonList = [{
            id: 1,
            name: "Bulbasaur",
            height: 70.12,
            weight: "15.2 lbs",
            category: "Seed",
            abillities: "Overgrow",
            type: ["Grass", "Poison"],
            evolution: ["1", "2", "3"]
        },
        {
            id: 2,
            name: "Ivysaur",
            height: 99.06,
            weight: "28.7 lbs",
            category: "Seed",
            abillities: ["Overgrow", "Headbut"],
            type: ["Grass", "Poison"],
            evolution: ["1", "2", "3"]
        },
        {
            id: 3,
            name: "Venusaur",
            height: 200.66,
            weight: "220.5 lbs",
            category: "Seed",
            abillities: "Overgrow",
            type: ["Grass", "Poison"],
            evolution: ["1", "2", "3"]
        },
        {
            id: 4,
            name: "Charmander",
            height: 60.96,
            weight: "18.7 lbs",
            category: "Lizard",
            abillities: "Blaze",
            type: "Fire",
            evolution: ["4", "5", "6"]
        }
    ];
    let id;

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
        pokemonImage.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`);
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
        if (!pokemon) {
            return window.alert("We dont have this pokemon in our database");
        }
        id = pokemon.id;
        let container = document.querySelector(".display");
        clearDisplay();
        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add("details-foto");
        pokemonImage.setAttribute("src", (`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`));
        container.appendChild(pokemonImage);
        let pokemonName = document.createElement("h1");
        pokemonName.classList.add(pokemon.id);
        container.appendChild(pokemonName);
        pokemonName.innerText = `#${pokemon.id} ${pokemon.name}`;
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
        let abillities = document.createElement("p");
        abillities.classList.add("description-header");
        abillities.innerText = "Abillities";
        description.appendChild(abillities);
        let abillitiesDiv = document.createElement("div");
        abillitiesDiv.classList.add("abillities");
        if (typeof (pokemon.abillities) === typeof ("string")) {
            let abillityP = document.createElement("p");
            abillityP.innerText = pokemon.abillities;
            abillitiesDiv.appendChild(abillityP);
        } else {
            pokemon.abillities.forEach(function (abillity) {
                let abillityP = document.createElement("p");
                abillityP.innerText = abillity;
                abillitiesDiv.appendChild(abillityP);
            })
        }
        description.appendChild(abillitiesDiv);
        let typeDiv = document.createElement("div");
        typeDiv.classList.add("type");
        if (typeof pokemon.type === typeof "string") {
            let buttonType = document.createElement("button");
            buttonType.classList.add(pokemon.type);
            buttonType.innerText = pokemon.type;
            typeDiv.appendChild(buttonType);
        } else {
            pokemon.type.forEach(function (type) {
                let buttonType = document.createElement("button");
                buttonType.classList.add(type);
                buttonType.innerText = type;
                typeDiv.appendChild(buttonType);
            })
        }
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
        pokemonList[id-1] = pokemonEdited;
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
        const abillities = document.getElementById('input-abilities').value.split(',')
        if (document.querySelector('.form__pokemon').querySelector('button').innerHTML === 'Add a new Pokemon') {
            const sended = add({
                id: pokemonList.length + 1,
                name: name,
                height: height,
                weight: weight,
                type: types,
                abillities: abillities
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
                abillities: abillities
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
        // document.getElementById('name').value = pokemon.name
        // document.getElementById('height').value = pokemon.height
        // document.getElementById('weight').value = pokemon.weight
        // document.getElementById('type').value = pokemon.types.join()
        // document.getElementById('abilities').value = pokemon.abilities.join()
    });

    console.log(id)
    console.log(pokemonList)


    getAll().forEach(function (pokemon, i) {
        addListItem(pokemon, i);
    })

    return {
        getAll: getAll,
        add: add,
        biggestPokemon: biggestPokemon,
        findPokemon: findPokemon,
        addListItem: addListItem,
        showDetails: showDetails,
        filterType: filterType,
        remove: remove,
        clearDisplay: clearDisplay
    };
})();