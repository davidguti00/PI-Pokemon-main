import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useEffect } from 'react';
import { getPokemons, getTypes } from '../redux/actions';
import "./styles/Landing.css";

export default function LandingPage() {

    const dispatch = useDispatch();
    const pokemonLoad = useSelector((state)=>state.allPokemons);
    const typesLoad = useSelector((state)=>state.types);

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])

    
    
    return (
        
            
            <div className='Landing'>
            <br/>
                <h1 className='title'>Welcome to Pokemon App</h1>
                {(pokemonLoad.length && typesLoad.length)?
                <Link to = '/home/'>
                    <br/>
                    <button className = "btnGeneral">Enter Site</button>
                    
                </Link>
                :null
                }
                <br/>
            </div>
            
        
        
    )
}