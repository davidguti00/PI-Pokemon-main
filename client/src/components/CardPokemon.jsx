import React from "react";
import "./styles/CardPokemon.css"

export default function CardPokemon ({ image, name, types,id }) {
    const paddedId = '#' + id.toString().padStart( 3, '000' );

    const className = types.map( (type) => ('type-' + type.name )).join( ' ' );

    return (
        
            <div className={ `card ${ className }` }>
                <div className="pokemon-image" >
                <img src={image?image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png'} alt="pokemon" />
                
                <span className="pokemon-id">{ paddedId.length<8 ? paddedId : "Db"}</span>
                </div>
                <div className="card-title">
                    <h2>{name}</h2>
                    <div className="pokemon-types">
                    <p>Types: </p>
                        {types?.map((type, i) => (
                            // <span className='type_card' key={i}>{typeName}</span>
                            <span className="type" key={ type.name }>{ type.name }</span>
                            // <li className='type_card' key={i} value={typeName.name}>
                            //     {typeName.name} 
                            // </li>
                        ))}
                    </div>
                </div>
            </div>
        
    )
}