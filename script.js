//console.log(`Pokemon API`);

const pokedex = document.getElementById('pokedex');

//loop through pokemon
function fetchPokedex() {
    const promises = [];
    for (let i = 1; i <= 200; i++) {
        const baseURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(baseURL).then((response) => response.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((pokemon) => ({
            name: pokemon.name,
            id: pokemon.id,
            weight: pokemon.weight,
            height: pokemon.height,
            base_experience: pokemon.base_experience,
            stats: pokemon.stats.map((stat) => stat.stat.name).join(', '),
            types: pokemon.types.map((type) => type.type.name).join(', '),
            moves: pokemon.moves.map((move) => move.move.name).join(', '),
            abilities: pokemon.abilities.map((ability) => ability.ability.name).join(', '),
            image: pokemon.sprites.other.dream_world['front_default']
        }));
        displayPokedex(pokemon);
    })
}

function displayPokedex(pokemon) {
    console.log(pokemon);
    
    const dataString = pokemon.map(
        (pokemon) =>
        `<div class="col">
        <div class="card h-100" id='${pokemon.name}'>
            <img class='card-img-top' src="${pokemon.image}" alt="${pokemon.name}" />
            <div class="card-body" id='${pokemon.name}Body'>
                <div class="card-content">
                    <h5 class='card-title'>${pokemon.name}</h5>
                    <p class='card-text'><span>Identification Number:</span> ${pokemon.id}<br>
                    <span>Weight:</span> ${pokemon.weight}&nbsp;&nbsp;&nbsp;&nbsp;<span>Height:</span> ${pokemon.height}<br>
                    <span>Base Experience:</span> ${pokemon.base_experience}<br>
                    <span>Type(s):</span> ${pokemon.types}<br>
                    </p>
                </div>
                <button type="button" class="btn btn-primary text-center" data-bs-toggle="modal" data-bs-target="#${pokemon.name}Modal">More Info
</button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="${pokemon.name}Modal" tabindex="-1" aria-labelledby="${pokemon.name}ModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${pokemon.name}ModalLabel">${pokemon.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p><span>Identification Number:</span> ${pokemon.id}<br>
        <span>Weight:</span> ${pokemon.weight}&nbsp;&nbsp;&nbsp;&nbsp;<span>Height:</span> ${pokemon.height}<br>
        <span>Base Experience:</span> ${pokemon.base_experience}<br>
        <span>Stats:</span> ${pokemon.stats}<br>
        <span>Type(s):</span> ${pokemon.types}<br>
        <span>Moves:</span> ${pokemon.moves}<br>
        <span>Abilities:</span> ${pokemon.abilities}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`
    )
        .join('');
    
    pokedex.innerHTML = dataString; //populate id='pokedex' with above HTML

}

fetchPokedex();
//END OF JAVASCRIPT ;)