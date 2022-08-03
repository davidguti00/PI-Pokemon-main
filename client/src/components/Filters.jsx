import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useState } from "react";
import { 
    filterPokemonByType, 
    filterPokemonByCreated, 
    orderingByAlpha, 
    orderingByAttack,
    // filterByHp, 
} from "../redux/actions";
import "./styles/Filters.css"

export default function Filters ({ setCurrentPage }) {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const [order, setOrder] = useState('')

    function handleFilterByType(e) {
        e.preventDefault()
        dispatch(filterPokemonByType(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByCreated(e) {
        e.preventDefault()
        dispatch(filterPokemonByCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderingByAlpha(e) {
        e.preventDefault()
        dispatch(orderingByAlpha(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)

    }
    function handleorderingByAttack(e) {
        e.preventDefault()
        dispatch(orderingByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    // function handleFilterByHp(e) {
    //     e.preventDefault()
    //     dispatch(filterByHp(e.target.value))
    //     setCurrentPage(1)
    // }


    return(
        <div className="filter-container">
                    <select className="custom-select" id="AlphaSelect" 
                    onChange={e =>  handleOrderingByAlpha(e)} defaultValue= "Alphabetical order">
                        <option disabled={order}>Alphabetical order</option>
                        <option value='ASC'>A-Z</option>
                        <option value='DESC'>Z-A </option>
                    </select>
                    <select className="custom-select" id="AttacSelect" 
                    onChange={e =>  handleorderingByAttack(e) } defaultValue= "Select Attack">
                        <option disabled={order} >Select By Attack</option>
                        <option value="asc">to the more Attack</option> 
                        <option value="desc">to the least Attack</option>
                    </select>
                    <select className="custom-select" id="TypesSelect" 
                    onChange={(e) => handleFilterByType(e)} defaultValue= "All Types">
                        <option value={'all'}>All Types</option>
                            {types?.map((types,id) => {
                                return  <option value={types.name} key={id}>{types.name}</option>;
                            })}
                    </select>
                    <select className="custom-select" id="OriginSelect" 
                    onChange={(e) => handleFilterByCreated(e)} defaultValue= "All Pokemons">
                        <option value="all">All Pokemon</option>
                        <option value="api">Existing</option>
                        <option value="created">Created</option>
                    </select>
                    {/* <select className="custom-select" id="HpSelect"
                    onChange={(e)=> handleFilterByHp(e)} defaultValue= "All Pokemons">
                        <option value="allHp">All Pokemon</option>
                        <option value="moreHp">More strong</option>
                    </select> */}
                </div>
    )


}