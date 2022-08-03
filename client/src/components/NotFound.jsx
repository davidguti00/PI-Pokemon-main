import React from 'react';
import {useHistory} from 'react-router-dom';
import "./styles/NotFound.css"
import pika404 from "./styles/images/pika404.gif"





export default function NotFound() {

    const history = useHistory()

    function handleClick(e) {
        e.preventDefault()
        history.push('/home')
    }

    return (
            <div className="not_found">
                <br/>
                <h1>Pokemons Not Found</h1>
                <br/>
                <div>
                    <button onClick={(e) => {handleClick(e)}} className = "btnPagina">Back to home!</button>
                </div>
                <br/>
                <img src={pika404} alt="not-found" className='image_not_found' />
                
            </div>
    )
}