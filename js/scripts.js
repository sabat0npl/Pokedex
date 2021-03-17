let pokemonList = [];
pokemonList = [
    {
        name: "Bulbasaur",
        height: 71.12,
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
]; // declaration of the table with pokemon objects


document.write(`
    <table>
        <thead>
            <tr><th>Name</th><th>Weight</th><th>Height</th><th>Category</th><th>Abilities</th><th>Type</th></tr>
        </thead>
        `);
for (let i=0; i<pokemonList.length; i++){

    document.write(`<tr><td>${pokemonList[i].name}</td><td>${pokemonList[i].weight}</td><td>${Math.round(pokemonList[i].height)}</td><td>${pokemonList[i].category}</td><td>${pokemonList[i].abilities}</td><td>${pokemonList[i].type}</td></tr>`);
}
document.write("</table>"); // displaying the table with pokemons using for loop

let huge = 0; // initiating a variable used to find the biggest pokemon

for (i=0; i<pokemonList.length; i++){
    pokemonList[i].height > pokemonList[huge].height ? huge=i : huge=huge;
} // condition that will find the bigges pokemon

document.write(`<h3>The ${pokemonList[huge].name} is huge!!!</h3>`); // printing the name of the biggest pokemon

