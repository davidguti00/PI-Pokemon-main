import React from "react";
import "./styles/Paginated.css"


export default function Paginated ({allPokemons, pokemonPP, paginated, prevPage, handleNext, handlePrev, nextPage, currentPage}){
    const max = allPokemons/pokemonPP
    
    const pageNumbers = [];
    for(let i = 0 ; i < Math.ceil(max); i++){
        pageNumbers.push(i + 1)
    }
    //     console.log(pageNumbers.length);
    return(
        <nav>
            <div className="page-conteiner">
                <ul className="paginated">
                    <p className="btnPage" onClick={()=>{paginated(pageNumbers[0])}}>1</p>
                    
                    <button className = "btnPagina" 
                    disabled = {prevPage === 0? true : false}
                    onClick = {handlePrev}>Prev
                    </button>

                    <p className="btnPage">{currentPage} de {pageNumbers.length} </p>

                    <button className = "btnPagina" 
                    disabled = {nextPage > pageNumbers.length ? true : false}
                    onClick = {handleNext}>Next
                    </button>

                    <p className="btnPage" onClick={()=>{paginated(pageNumbers.length)}}>{pageNumbers.length}</p>
                </ul>
            </div>
            
        </nav>
    )
}