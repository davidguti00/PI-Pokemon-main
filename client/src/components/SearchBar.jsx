import React from "react";
import "./styles/SearchBar.css"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPokemonByName } from "../redux/actions";

function validate(pokemon) {
    let error = "";
    if(pokemon === "") {
        error= "Please insert a name"
    }
    return error;
}

export default function SeachBar ({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function handlePokemonChange(e){
        e.preventDefault();
        setName(e.target.value)
        setCurrentPage(1)
    }

    function handleSubmit (e) {
        e.preventDefault()
        if(name !== ""){
            
            dispatch(getPokemonByName(name)).then((res)=>{
                console.log(res)
                setName("")
                
            }).catch((error)=>{
                console.log(error)
                alert(error.response.data)
                setName("")
            })
        }
        setError(validate(name))
    }

    return(
        <div className="search">
            <input 
                type="text" 
                className="inputSearch"
                name="name" 
                value={name}
                placeholder="search pokemon..." 
                onChange={e => handlePokemonChange(e)} 
            />
            <button 
                className="buttonHome"
                type="submit" 
                onClick={(e) => handleSubmit(e)}> 
                Search
            </button>
            {error ? 
            <div className="error-message">
                <span>{error}</span>
            </div> : null
            }
        </div>
    )
}