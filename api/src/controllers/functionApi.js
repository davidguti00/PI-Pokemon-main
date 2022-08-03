
const axios = require('axios');
const { Type } = require ("../db");

let fastLoadPokemons = []

module.exports = {

    getPokemonsApi : async () => {
        try {
            if(!fastLoadPokemons.length){
                const pageOne = await axios.get('https://pokeapi.co/api/v2/pokemon');
                const pageTwo = await axios.get(pageOne.data.next);
                //  const pageThree = await axios.get(pageTwo.data.next);
                //  const pageFour = await axios.get(pageThree.data.next);
                //  const pageFive = await axios.get(pageFour.data.next);
                //  const pageSix = await axios.get(pageFive.data.next);
                const allPages = pageOne.data.results.concat(pageTwo.data.results);
                //  const allPages = [...pageOne.data.results, ...pageTwo.data.results, 
                //  ...pageThree.data.results, ...pageFive.data.results, ...pageSix.data.results]
                //console.log('todas las paginas',allPages)

                const allData = await Promise.all(allPages.map(async (links) => (await axios.get(links.url)).data));
                //console.log('promesas resueltas para mapear',allData)
            
                const pokemons = allData.map((pokemon)=>{
                    return{
                        id: pokemon.id,
                        name: pokemon.name,
                        image: pokemon.sprites.other.dream_world.front_default || "https://w7.pngwing.com/pngs/661/707/png-transparent-pokemon-sun-and-moon-pokemon-black-white-pokemon-diamond-and-pearl-pokemon-x-and-y-the-pokemon-company-others-text-rectangle-logo-thumbnail.png" ,
                        height: pokemon.height,
                        weight: pokemon.weight,
                        types: pokemon.types.map(t => ({ name: t.type.name })),
                        hp: pokemon.stats[0].base_stat,
                        attack: pokemon.stats[1].base_stat,
                        defense: pokemon.stats[2].base_stat,
                        speed: pokemon.stats[5].base_stat,
                    };
                });
                fastLoadPokemons = [...pokemons];
                return pokemons;
            } return fastLoadPokemons;

        } catch (error) {
            console.log (error)
            throw error 
        }
    },

    getTypes: async () => {
        try {
            let types = await Type.findAll()
            if(!types.length){
                const { data } = await axios.get('https://pokeapi.co/api/v2/type')
                const result = data.results.map(( type ) => ({ name: type.name }))
                types = await Type.bulkCreate(result)
            } else{
                console.log("ya tengo cargados los Tipos de pokemones en Base de Datos")
                return types
            }
        } catch (error) {
            console.log (error)
            throw error 
        }
    },

    getPokemonsByNameApi: async (name) => {
        const nameMinuscule = name.toLowerCase()
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameMinuscule}`)
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default   || "https://w7.pngwing.com/pngs/661/707/png-transparent-pokemon-sun-and-moon-pokemon-black-white-pokemon-diamond-and-pearl-pokemon-x-and-y-the-pokemon-company-others-text-rectangle-logo-thumbnail.png" ,
                height: data.height,
                weight: data.weight,
                types: data.types.map(t => ({ name: t.type.name })),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
            }
            return pokemon

        } catch (error) {
            console.log (error)
            throw error 
        }
    },

    getPokemonsByNameApiSearch: async (name) => {
        const nameMinuscule = name.toLowerCase()
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameMinuscule}`)
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default || "https://w7.pngwing.com/pngs/661/707/png-transparent-pokemon-sun-and-moon-pokemon-black-white-pokemon-diamond-and-pearl-pokemon-x-and-y-the-pokemon-company-others-text-rectangle-logo-thumbnail.png" ,
                height: data.height,
                weight: data.weight,
                types: data.types.map(t => ({ name: t.type.name })),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
            }
            return pokemon

        } catch (error) {
            console.log (error)
        }
    },


    getPokemonsByIdApi: async (id) => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default || "https://w7.pngwing.com/pngs/661/707/png-transparent-pokemon-sun-and-moon-pokemon-black-white-pokemon-diamond-and-pearl-pokemon-x-and-y-the-pokemon-company-others-text-rectangle-logo-thumbnail.png" ,
                height: data.height,
                weight: data.weight,
                types: data.types.map(t => ({ name: t.type.name })),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
            }
            return pokemon

        } catch (error) {
            throw error 
        }
    }

}

