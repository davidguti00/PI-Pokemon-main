import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from  "./components/Home";
import CreatePokemon from "./components/CreatePokemon";
import Details from "./components/Details";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path ='/create/' component={CreatePokemon}/>
          <Route exact path ='/home/:id/' component={Details}/>
          <Route exact path ='/home/' component={Home}/>
          <Route exact path ='/' component={LandingPage}/>
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
