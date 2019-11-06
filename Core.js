let pokeIndex = 1;

function setApp()
{
    setDimensions();
    triggerPokemon(pokeIndex);
    setPokeList();
}

function setDimensions()
{
    let contentAreaWidth = document.getElementById("content").offsetWidth;
    let pokeContent = document.getElementById("pokeContent");


    //Set width of pokeContent by subtracting width of the buttons
    pokeContent.style.width = contentAreaWidth - 82 + "px";
}

function setPokeList()
{
    let pokeList = document.getElementById("pokemonList");
    let counter = 1;

    while(counter <= 151)
    {
        let newListItem = document.createElement("li");

        fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)
        .then((res) => res.json())
        .then((data) => {
            newListItem.innerHTML = data.name;
            newListItem.addEventListener("click", () => {
                triggerPokemon(data.id);
            });
        });

        pokeList.appendChild(newListItem);

        counter++;
    }
}

function triggerPokemon(pokemon)
{
    let pokeName = document.getElementById("pokeName_Content");
    let pokeSprite = document.getElementById("sprite");
    let pokeType = document.getElementById("pokeType");
    let pokeWeight = document.getElementById("pokeWeight");

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
        pokeName.innerHTML = data.name.toUpperCase();
        pokeSprite.src = data.sprites["front_default"];

        pokeType.innerHTML = "";

        for(var i = 0; i < data.types.length; i++)
        {
            pokeType.innerHTML += data.types[i].type.name;

            if(i < data.types.length - 1)
            {
                pokeType.innerHTML += ", ";
            }
        }

        pokeWeight.innerHTML = data.weight + " lbs";

        pokeIndex = data.id;
    
    });

}

function nextPokemon()
{
    if(pokeIndex <= 151)
    {
        pokeIndex++;
        triggerPokemon(pokeIndex);
    }
}

function prevPokemon()
{
    if(pokeIndex >= 1)
    {
        pokeIndex--;
        triggerPokemon(pokeIndex);
    }
}
