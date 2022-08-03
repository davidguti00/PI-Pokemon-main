import {
    GET_ALL_POKEMONS,
    GET_TYPES,
    GET_POKEMONS_BY_NAME,
    GET_DETAILS,
    FILTER_BY_TYPE,
    FILTER_BY_CREATED,
    ORDERING_BY_ALPHA,
    ORDERING_BY_ATTACK,
    CLEAR_DETAILS,
    CLEAR_HOME,
    FILTER_BY_HP,
} from "./actions";

const initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
    details: [],
    

}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_POKEMONS:
            return  {
                ...state,
                allPokemons: state.allPokemons.length ? state.allPokemons : action.payload,
                pokemons: state.pokemons.length ? state.pokemons : action.payload,
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }

        case GET_POKEMONS_BY_NAME:
            return {
                ...state,
                pokemons: action.payload,
            
            }

        case GET_DETAILS:
            return {
                ...state,
                details: action.payload,
                
            }

        case FILTER_BY_TYPE:
            const filterByType = state.allPokemons;
            const types = action.payload === "all" ? filterByType : 
            filterByType.filter((e) => e.types && e.types
                        .map((types) => types.name)
                        .includes(action.payload)
                );
            return {
                ...state,
                pokemons: types,
            }


        case FILTER_BY_CREATED:
            const filterCreated = action.payload === 'created' ? 
            state.allPokemons.filter(e => e.createdInDb) : 
            state.allPokemons.filter(e => !e.createdInDb)
            return{
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : filterCreated
            }

        case ORDERING_BY_ALPHA:
            let pokeAlpha = [...state.pokemons]
            pokeAlpha = pokeAlpha.sort((a,b) =>{
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                return action.payload === 'ASC' ? -1 : 1
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                return action.payload === 'DESC' ? -1 : 1
                }else{
                return 0}
            })
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : pokeAlpha
            }

        case ORDERING_BY_ATTACK:
            let attack = action.payload === "asc" ? 
            state.pokemons.sort((a, b) => { return b.attack - a.attack }) : 
            state.pokemons.sort((a, b) => { return a.attack - b.attack });
            return {
                ...state,
                pokemons: attack,
            }

        case CLEAR_DETAILS:
            return{
                ...state,
                details: action.payload,
            }

        case CLEAR_HOME:
            return{
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
            }


        case FILTER_BY_HP:
            return{
                ...state,
                pokemons: action.payload === 'moreHp' ?
                state.allPokemons.filter(e => (e.attack > 40 && e.attack < 80 && e.height > 0.2)) :
                state.allPokemons
            }

        default: return state;
    }
}

export default rootReducer