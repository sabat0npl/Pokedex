let pokemonRepository = (function () {
    let pokemonList = [{
            id: 1,
            name: "Bulbasaur",
            height: 70.12,
            weight: "15.2 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {
            id: 2,
            name: "Ivysaur",
            height: 99.06,
            weight: "28.7 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {
            id: 3,
            name: "Venusaur",
            height: 200.66,
            weight: "220.5 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {   
            id: 4,
            name: "Charmander",
            height: 60.96,
            weight: "18.7 lbs",
            category: "Lizard",
            abilities: "Blaze",
            type: "Fire"
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function addv(item) {
        let keysValidation = [];
        Object.keys(pokemonList[0]).forEach(function (key, i) {
            return keysValidation.push(key === Object.keys(item)[i])
        });
        return typeof (item) === typeof ({}) && keysValidation.indexOf(false) === -1 ? true : false;
    }

    function add(item) {
        addv(item) ? pokemonList.push(item) : console.log("Wrong data");
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
        let pokemonListUl = document.querySelector(".display")
        let listItem = document.createElement("button");
        let pokemonImage = document.createElement("img");
        let pokemonName = document.createElement("p");
        listItem.classList.add("pokemon-list__item");
        pokemonImage.classList.add("pokemon-list__image");
        pokemonImage.setAttribute("src", (`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`));
        pokemonName.innerText = pokemon.name;
        pokemonName.classList.add("pokemon-item__name");
        listItem.addEventListener("click", function () { // I am runing a showDetails function wrapped in function so it runs only after clik and not immediately
            showDetails(pokemon);
        });
        listItem.appendChild(pokemonImage);
        listItem.appendChild(pokemonName);
        pokemonListUl.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        biggestPokemon: biggestPokemon,
        findPokemon: findPokemon,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
})