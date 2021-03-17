let pokemonList = [];
pokemonList = [
    {
        name: "Bulbasaur",
        height: "2'04\"",
        weight: "15.2 lbs",
        category: "Seed",
        abilities: "Overgrow",
        type: ["Grass", "Poison"]
    },
    {
        name: "Ivysaur",
        height: "3'03\"",
        weight: "28.7 lbs",
        category: "Seed",
        abilities: "Overgrow",
        type: ["Grass", "Poison"]
    },
    {
        name: "Venusaur",
        height: "6'07\"",
        weight: "220.5 lbs",
        category: "Seed",
        abilities: "Overgrow",
        type: ["Grass", "Poison"]
    },
    {
        name: "Bulbasaur",
        height: "2'04\"",
        weight: "15.2 lbs",
        category: "Seed",
        abilities: "Overgrow",
        type: ["Grass", "Poison"]
    },
    {
        name: "Charmander",
        height: "2'00\"",
        weight: "18.7 lbs",
        category: "Lizard",
        abilities: "Blaze",
        type: "Fire"
    }
]
// document.write(JSON.stringify(pokemonList));
// document.write(`
//     <table>
//         <thead>
//             <tr><th>Name</th><th>Height</th><th>Weight</th><th>Category</th><th>Abilities</th><th>Type</th></tr>
//         </thead>
//         `);
// for (let i=0; i<pokemonList.length; i++){

//     document.write("<tr>"+"<td>"+pokemonList[i].name+"</td>"+"<td>"+pokemonList[i].weight+"</td>"+"<td>"+pokemonList[i].height+ "</td>"+"<td>"+pokemonList[i].category+"</td>"+"<td>"+pokemonList[i].abilities+"</td>"+"<td>"+pokemonList[i].type+"</td></tr>");
// }
// document.write("</table");

document.write(`
    <table>
        <thead>
            <tr><th>Name</th><th>Height</th><th>Weight</th><th>Category</th><th>Abilities</th><th>Type</th></tr>
        </thead>
        `);
for (let i=0; i<pokemonList.length; i++){

    document.write(`<tr><td>${pokemonList[i].name}</td><td>${pokemonList[i].weight}</td><td>${pokemonList[i].height}</td><td>${pokemonList[i].category}</td><td>${pokemonList[i].abilities}</td><td>${pokemonList[i].type}</td></tr>`);
}
document.write("</table>");
