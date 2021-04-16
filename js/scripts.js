let pokemonRepository = (function () {
    let searchInput = document.querySelector('.search')
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/?limit=100`;
    let pokemonList = [];
    // The function is to fetch to pokemon API and then add each item in the returned Promise to the pokemonList from above.
    function loadItems() {
        showLoadingMessage() //code to show loading image.
        return fetch(pokeAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseJSON) {
                let items = responseJSON.results;
                items.forEach(function (item, i) {
                    let pokemon = {
                        index: i + 1,
                        name: item.name[0].toUpperCase() + item.name.slice(1),
                        detailsURL: item.url
                    };
                    add(pokemon);
                })
                hideLoadingMessage(); //code to stop the loading image.
            })
            .catch(function (error) {
                console.log(`Fetch failed: ${error}`);
            })
    }
    // This funciton is to load the details of the Pokemon via fetch. If successful, the pokemon's height, weight and image of the pokemon will be store in a pokeDetails object.
    function loadDetails(currentPokemon) {
        showLoadingMessage() //code to show loading image.
        let url = currentPokemon.detailsURL;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                currentPokemon.index = details.id;
                currentPokemon.height = details.height;
                currentPokemon.weight = details.weight;
                currentPokemon.types = [];
                details.types.forEach(function (object) {
                    return currentPokemon.types.push(object.type.name)
                });
                currentPokemon.abilities = [];
                details.abilities.forEach(function (object) {
                    return currentPokemon.abilities.push(object.ability.name)
                });
                hideLoadingMessage(); //code to stop the loading image.
            })
            .catch(function (error) {
                console.log(`Fetch failed: ${error}`);
            })
    }

    function showLoadingMessage() {
        console.log(`Loading...`)
    }

    function hideLoadingMessage() {
        console.log(`Done!`)
    }
    // This is function is called through a loop from the loadItem function to add each item(pokemon) to the pokemonList from above. 
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    //This function is to retrieve all available Pokemon fromt he pokemonList from above.
    function getAll() {
        return pokemonList;
    }
    // This function is to add each Pokemon a an list to be display in the web applicaiton.
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('pokemon');
        listItem.classList.add('col-12');
        listItem.classList.add('col-md-4');
        let button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#pokemonModal');
        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add("pokemon-list__image");
        pokemonImage.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${pokemon.index}.png`);
        button.innerText = pokemon.name;
        // append elements to 
        button.appendChild(pokemonImage);
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        addClickEvent(button, pokemon);
    }
    //This function is used to add a event listener to each pokemon button created by the function above.
    function addClickEvent(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function constructDetailModal(pokeName, pokeHeight, pokeIndex, pokeType, pokeWeight, pokeAbilities) {
        return new Promise(function (resolve, reject) {
            let modalTitle = document.querySelector('.modal-title');
            let modalBody = document.querySelector('.modal-body');
            let modalFooter = document.querySelector('.modal-footer');
            let modalImage = document.createElement('img');
            modalImage.classList.add('modal-image');
            let description = document.createElement("div");
            description.classList.add("description");

            let size = document.createElement("div");
            size.classList.add("size");
            description.appendChild(size);
            let sizeH = document.createElement("p");
            sizeH.innerHTML = `Height <span> ${pokeHeight} </span>`;
            size.appendChild(sizeH);
            let sizeW = document.createElement("p");
            sizeW.innerHTML = `Weight <span> ${pokeWeight} </span>`;
            size.appendChild(sizeW);
            let abilities = document.createElement("p");
            abilities.classList.add("description-header");
            abilities.innerText = "Abilities";
            description.appendChild(abilities);
            let abilitiesDiv = document.createElement("div");
            abilitiesDiv.classList.add("abilities");
            pokeAbilities.forEach(function (ability) {
                let abilityP = document.createElement("p");
                abilityP.innerText = ability;
                abilitiesDiv.appendChild(abilityP);
            })
            description.appendChild(abilitiesDiv);
            let typeDiv = document.createElement("div");
            typeDiv.classList.add("type");
            pokeType.forEach(function (type) {
                let buttonType = document.createElement("button");
                buttonType.classList.add(type);
                buttonType.innerText = type;
                typeDiv.appendChild(buttonType);
            })


            // reset html in modal body before adding new data
            modalBody.innerHTML = "";

            modalTitle.innerHTML = `<h1>${pokeName}</h1>` ;
            modalImage.setAttribute('src', (`https://pokeres.bastionbot.org/images/pokemon/${pokeIndex}.png`));
            modalImage.setAttribute('width', '200px');
            modalImage.setAttribute('alt', `this is a picture of ${pokeName}`);

            // Append details to the modal body
            modalBody.append(modalImage);
            modalBody.append(description);
            modalBody.append(typeDiv);

            // promise resolve pass the modal container to be handled in the show details function
            resolve('Completed successfully!');
            reject('Unable to complete task...');

        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let pokeName = pokemon.name;
            let pokeHeight = pokemon.height;
            let pokeIndex = pokemon.index;
            let pokeWeight = pokemon.weight;
            let pokeAbilities = pokemon.abilities;
            let pokeType = pokemon.types;
            constructDetailModal(pokeName, pokeHeight, pokeIndex, pokeType, pokeWeight, pokeAbilities)
                .then(function (result) {
                    console.log(result);
                })
                .catch(function (result) {
                    // code to run upon unsuccessful promise completion
                    console.log(result);
                })
        });
    }

    searchInput.addEventListener('input', function () {
        let allPokemon = document.querySelectorAll('.pokemon');
        let filterValue = searchInput.value.toUpperCase();

        allPokemon.forEach(function (item) {
            console.log(item.innerText);
            if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        })
    });

    // The following return will return the functions of this IIFE to be used outside this scope/context
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadItems: loadItems,
        loadDeails: loadDetails
    }
})();

pokemonRepository.loadItems()
    .then(function (pokemonList) {
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    })