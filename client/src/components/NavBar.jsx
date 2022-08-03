import React from "react";
import SearchBar from "./SearchBar.jsx";
import "./styles/NavBar.css"



export default function NavBar({setCurrentPage}) {
    
    return(
        <div className="NavBar">
            <nav>
                <div className="content">
                    <div className="logo"><a href="/home">Poke app</a></div>
                    <ul className="links">
                        <li><a href='/create'>Create Pokemon</a></li>
                        <li><a href='/home'>Reload</a></li>
                    </ul>
                    <form className="search-box">
                    <div className="search-icon"><i className="fas fa-search"></i>
                        <SearchBar setCurrentPage={setCurrentPage} />
                    </div>
                    </form>
                </div>
            </nav>
        </div>
    )
}

