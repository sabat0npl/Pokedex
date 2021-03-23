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

    function showDetails(pokemon) {
        let container = document.querySelector(".display");
        while (container.lastChild) {
            container.removeChild(document.querySelector(".display").lastChild);
        }
        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add("details-foto");
        pokemonImage.setAttribute("src", (`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`));
        container.appendChild(pokemonImage);
        let pokemonName = document.createElement("h1");
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

pokemonRepository.getAll().forEach(function (pokemon, i) {
    pokemonRepository.addListItem(pokemon, i);
})