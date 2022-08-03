import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from "../redux/actions";
import { Link } from "react-router-dom";

import CardPokemon from "./CardPokemon";
import Loading from "./Loading";
import NavBar from "./NavBar";
import Filters from "./Filters";
import Paginated from "./Paginated";


import "./styles/CardPokemon.css"
import "./styles/Home.css"
import pika404 from "./styles/images/pika404.gif"


export default function Home () {
    const dispatch = useDispatch()

    const {pokemons} = useSelector(state => state)
    const allPokemonsLoad = useSelector((state) => state.allPokemons)
 //console.log(pokemons);
    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPP, /*setPokemonPP*/] = useState(12);
    const lastPokemon = currentPage * pokemonPP;
    const indexFirstPokemon = lastPokemon - pokemonPP;

    let currentPokemon = []
    Array.isArray(pokemons) ?
    currentPokemon = pokemons.slice(indexFirstPokemon, lastPokemon) :
    currentPokemon.push(pokemons)

    //console.log(currentPokemon)
    const prevPage = currentPage -1;
    const nextPage = currentPage +1;

    const paginated = (pageNumber) =>{
        setCurrentPage(pageNumber)
    };

    const handlePrev = () =>{
        setCurrentPage(prevPage)
    };

    const handleNext = () =>{
        setCurrentPage(nextPage)
    };

    useEffect(()=>{
        dispatch(getPokemons()) 
        dispatch(getTypes())
    },[dispatch]) 
    
    
    return (
        <div className="pokedex-app">
            {!allPokemonsLoad.length ?
            <div className="Loading">
                <Loading/>
            </div> :
            <div className="allHome">
                <div>
                    <NavBar setCurrentPage = {setCurrentPage}/>
                </div>
                <div>
                    <Filters setCurrentPage = {setCurrentPage}/>
                </div>
                <div>
                    <Paginated
                        currentPage={currentPage}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        allPokemons={pokemons.length}
                        pokemonPP={pokemonPP}
                        paginated={paginated}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                </div>
                
                <div className="card-container">
                    {currentPokemon.length ? 
                    currentPokemon.map((poke) => {return (
                            <Link  to={"/home/" + poke.id} key={poke.id} >                
                                <CardPokemon 
                                    id={poke.id}
                                    image={poke.image}
                                    name={poke.name}
                                    types={poke.types}
                                />
                            </Link>
                    )})
                    
                    : 
                    <div className="NotFound">
                        <br/>
                        <h1>Pokemons Not Found</h1>
                        <br/>
                        <img src={pika404} alt="NotFound" />
                    </div>
                    }
                    

                </div>
                <div>
                    <br/>
                </div>
            </div>
            }
            
        </div>
    )


}