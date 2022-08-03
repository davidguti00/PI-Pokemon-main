import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetails, clearDetails, deletePokemon, clearHome} from "../redux/actions";
import NotFound from "./NotFound";
import Loading from "./Loading"
import "./styles/Details.css"



export default function Details() {

    const dispatch = useDispatch()
    const { details } = useSelector(state=> state);
    

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetails(id))
        return () => {
            dispatch(clearDetails())
        }

    }, [dispatch, id])


    function handleClick(e) {
        e.preventDefault()
        history.push('/home')
        //  window.history.back()
    
    }

    function handleDelete(id){
        function confirmacion(){
            var respuesta = window.confirm('Are you sure you want to delete the Pokemon?')
            if (respuesta === true){
                //localStorage.clear();
                //console.log('este es el id antes del dispatch',id)
                dispatch(deletePokemon(id))
                .then(res=>{
                    console.log(res)
                    history.push('/home')
                    alert(res.data)
                })
                dispatch(clearHome())
            }
        } 
        confirmacion()
        
    }

    function handleEdit(e){
        history.push('/create', details)
    }    
    
	const height = details.height * 10; // cm
	const weight = details.weight / 10; // kg

    const className = details.types && details.types.map((type)=>('type-' + type.name)).join(', ');
    console.log(id)

    return (
        
        <div className="allHome">
            
            {details.types === null || details.length === 0  ?        
            <div className="loading">
                <Loading/> 
            </div> :
            <div className="conainer-page">
                
                {details.name === "SequelizeDatabaseError" ?
                <div >
                    <NotFound/>
                </div> :
                
                <div className="pokemon-page">
                    <div className="pokemon-button">
                    <button onClick={(e) => {handleClick(e)}} className="btn-page">Back to home!</button> 
                    </div>
                    
                    <div className="pokemon-card">
                        <div className= { `header-card ${ className }` } >
                            <h2>{details.name}</h2>
                            <div className="pokemon-types">
                            <label>Types: </label>
                                {details.types && details.types.map((type, i) => (
                                    <span className="type" key={ type.name }> { type.name } </span>
                                ))}
                            </div>
                            
                        </div>
                        <div className="details-card"> 
                        {details.createdInDb ? 
                        <div>
                            <button onClick={()=> handleDelete(details.id)} className = "btnPagina">
                                Delete Pokemon
                            </button>
                        </div>: null
                        }
                        {details.createdInDb ? 
                        <div>
                            <button onClick={()=> handleEdit(details.id)} className = "btnPagina">
                                Edit Pokemon
                            </button>
                        </div>: null
                        }
                        <div className="container_info">
                            <div className="pokemon-image">
                                <img src={details.image} className="imgDetailCard" alt="Imagen del Pokemon" />
                            </div>
                            
                            <div className="atributes">
                                <p>Height: { height ? height : 'Undefined' } cm</p>
                                <p>Weight: { weight ? weight : 'Undefined' } kg</p>
                            </div>
                            <br/>
                            <div className="sub-atributes">
                                <p>Hp: { details.hp ? details.hp : 'Undefined' }</p>
                                <p>Attack: { details.attack ? details.attack : 'Undefined' }</p>
                                <p>Defense: { details.defense ? details.defense : 'Undefined' }</p>
                                <p>Speed: { details.speed ? details.speed : 'Undefined' }</p>
                                <br/>
                            </div>
                            
                            <div className="pokemon-id-details">
                                <br/>
                                <span className="pokemon-types">Id: {id}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <br/>
            </div>
            }
            
        </div>
    }
        </div>
        
        
    )
}
