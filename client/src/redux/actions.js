import axios from "axios";



export function getPokemons(){
    return async function (dispatch){
        //const pokemonStorage = JSON.parse(localStorage.getItem('PokemonStorage'))

        // if(pokemonStorage){
        //     return dispatch({
        //         type: 'GET_ALL_POKEMONS',
        //         payload: pokemonStorage,
        //     })
        // } else {
            try {
                const json = await axios.get(`http://localhost:3001/pokemon`)
                const data = json.data
                //localStorage.setItem('PokemonStorage', JSON.stringify(data));
                console.log(data)
                return dispatch({
                    type: 'GET_ALL_POKEMONS',
                    payload: data,
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
//}


export function getTypes(){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/type`)
                const data = json.data
                return dispatch({
                    type: 'GET_TYPES',
                    payload: data
                })
        } catch (error) {
        console.log(error)
    }
    }
}

export function postPokemon(form){
    return async function (dispatch){
        try {
            const json = await axios.post(`http://localhost:3001/pokemon`, form)
            const response = json.data
            localStorage.clear()
            //console.log(response)
            dispatch({
                type: 'POST_POKEMON',
                payload: response
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}
//BUSCA LOS NOMBRES EN API Y DATA BASE 
export function getNameForm(name){
    return async function (dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/pokemon/searchNameForm?name=${name}`)
            const response = json.data
            //console.log('ESTO ES LA RESPUESTA DEL BACK',response)
            dispatch({
                type: 'GET_POKEMONS_FORM_BY_NAME',
                payload: response,
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}


export function getPokemonByName (name) {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/pokemon?name=${name}`)
            const response = json.data
             //console.log('ESTA ES LA RESPUESTA DE LA SEARCH BAR',response)
            dispatch({
                type: 'GET_POKEMONS_BY_NAME',
                payload: response
            })
            return json;
        } catch(error){
             //console.log('ESTA Es EL ERROR DE LA SEARCH BAR', error)
            throw error
        }
    }
}

export function getDetails (id) {
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/pokemon/${id}`)
            const data = json.data
            //console.log(data)
            return dispatch({
                type: 'GET_DETAILS',
                payload: data
            })
        } catch(error){
            console.log(error)
        }
    }
}

//FILTRO POR TIPO
export function filterPokemonByType(payload){
    return{
        type: 'FILTER_BY_TYPE',
        payload
    }
}

// FILTRO POR ORIGEN
export function filterPokemonByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED',
        payload
    }
}

//ORDENAMIENTO ALFABETICO 
export function orderingByAlpha(payload){
    return {
        type: 'ORDERING_BY_ALPHA',
        payload
    }
}

//ORDENAMIENTO POR ATAQUE 
export function orderingByAttack(payload){
    return{
        type: 'ORDERING_BY_ATTACK',
        payload
    }
}

export function deletePokemon(id){
    return async function(dispatch){
        try{   
            const json = await axios.delete(`http://localhost:3001/pokemon/${id}`)
            const response = json.data;
            //localStorage.clear()
            console.log(json)
            if(response.status === 200) dispatch({
                type: 'DELETE_POKEMON',
                payload: id
            })
            return json;

        }catch(error){
        console.log(error)
    }
    }
}

export function updatePokemon(id, form){
    return async function(dispatch){
        
        try{
            const json = await axios.put(`http://localhost:3001/pokemon/${id}`, form)
            const response = json.data;
            localStorage.clear()
            console.log(json)
            dispatch({
                type: 'UPDATE_POKEMON',
                payload: response
            })
            return response;
        }catch(error){
            console.log(error)
        }
    }
}

export function clearDetails(payload){
    return{
        type: "CLEAR_DETAILS",
        payload:[],
    }
}
export function clearHome(payload){
    return{
        type: "CLEAR_HOME",
        payload:[],
    }
}

export function filterByHp(payload){
    return{
        type: "FILTER_BY_HP",
        payload
    }
}

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_POKEMONS_FORM_BY_NAME = "GET_POKEMONS_FORM_BY_NAME";
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDERING_BY_ALPHA = "ORDERING_BY_ALPHA";
export const ORDERING_BY_ATTACK = "ORDERING_BY_ATTACK";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const CLEAR_HOME = "CLEAR_HOME";
export const FILTER_BY_HP = "FILTER_BY_HP";





