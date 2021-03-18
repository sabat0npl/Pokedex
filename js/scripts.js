let pokemonRepository = (function () {
    let pokemonList = [{
            name: "Bulbasaur",
            height: 70.12,
            weight: "15.2 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {
            name: "Ivysaur",
            height: 99.06,
            weight: "28.7 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {
            name: "Venusaur",
            height: 200.66,
            weight: "220.5 lbs",
            category: "Seed",
            abilities: "Overgrow",
            type: ["Grass", "Poison"]
        },
        {
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

    return {
        getAll: getAll,
        add: add,
        biggestPokemon: biggestPokemon,
        findPokemon: findPokemon
    };
})();

console.log(pokemonRepository.findPokemon("Bulbasaur"));

pokemonRepository.add({
    name: "Eve",
    height: 20.96,
    weight: "8.7 lbs",
    category: "Cute",
    abilities: "Thunder",
    type: "Sweetnes"
});

pokemonRepository.add({
    name: "Eve",
    height: 20.96,
    weight: "8.7 lbs",
    category: "Cute",
    abilities: "Thunder",
    // type: "Sweetnes"
});

document.write(`
    <table>
        <thead>
            <tr><th>Name</th><th>Weight</th><th>Height</th><th>Category</th><th>Abilities</th><th>Type</th></tr>
        </thead>
        `);

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(`<tr><td>${pokemon.name}</td><td>${pokemon.weight}</td><td>${Math.round(pokemon.height)}</td><td>${pokemon.category}</td><td>${pokemon.abilities}</td><td>${pokemon.type}</td></tr>`);
})

document.write("</table>"); // displaying the table with pokemons using for loop

document.write(`<h3>The ${pokemonRepository.biggestPokemon()} is huge!!!</h3>`); // printing the name of the biggest pokemon