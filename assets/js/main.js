
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

function verDetalhes(pokeId){
    window.location.href = `detail.html?id=${pokeId}` 
}

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        <ol class="types">
                            <li class="detail_btn" onclick="verDetalhes(${pokemon.number})">detail</li>
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                    </div>
                </li>
            `).join('')

        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

/*
function individualPokemon(){
    const listaItems = document.querySelectorAll(`#pokemonList li span`)
    
    listaItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            var nomePoke = item.innerText
            console.log(nomePoke)
        })
    })
}
*/

