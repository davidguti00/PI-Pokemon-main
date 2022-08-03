import { useForm } from "../hooks/userForm.js";
import { useHistory } from "react-router-dom";
import "./styles/CreatePokemon.css";

//import buttonCheckRed from "./images/buttonCheckRed.png";


const expresionDate = {
    name: /^[ A-Za-z_@./#&+-]{3,25}$/,  // Letras y numeros, caracteres especiales, min 3 max 20 caracteres.
    image_url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*){0,255}$/,
    number: /^\d+$/ // numeros enteros
}

const validationForm = (form) => {
        let errors = {}
            //validacion name
        if(!form.name){
            errors.name = 'Please, name is required';
        } else if (!expresionDate.name.test(form.name.trim())) {
            errors.name = 'The name must be text type and must be between 3 and 25 characters';

            // validacion hp
        } else if(!form.hp){
            errors.hp = 'Please, hp is required';
        } else if (form.hp < 0 || form.hp > 200) {
            errors.hp = 'Please, hp must be between 0 and 200';
        } else if (!expresionDate.number.test(form.hp)) {
            errors.hp = 'The required field accepts only numbers';

            //validacion image url
        } else if (!expresionDate.image_url.test(form.image)) {
            errors.image = "*Image URL is required, or is going to be our default img"
        } else if(!expresionDate.image_url.test(form.image)){
            form.image && (errors.image = 'Please, this field must be a valid URL');

            // validacion height
        } else if(!form.height){
            errors.height = 'Please, height is required';
        } else if (form.height < 0 || form.height > 200) {
            errors.height = 'Please, height must be between 0 and 200';
        } else if (!expresionDate.number.test(form.height)) {
            errors.height = 'The required field accepts only numbers';

            // validacion weight (peso)
        } else if(!form.weight){
            errors.weight = 'Please, weight is required';
        } else if (form.weight < 0 || form.weight > 9999) {
            errors.weight = 'Please, weight must be between 0 and 9999';
        } else if (!expresionDate.number.test(form.weight)) {
            errors.weight = 'The required field accepts only numbers';

            // validacion attack
        } else if(!form.attack){
            errors.attack = 'Please, attack is required';
        } else if (form.attack < 0 || form.attack > 200) {
            errors.attack = 'Please, attack must be between 0 and 200';
        } else if (!expresionDate.number.test(form.attack)) {
            errors.attack = 'The required field accepts only numbers';

            // validacion defense
        } else if(!form.defense){
            errors.defense = 'Please, defense is required';
        } else if (form.defense < 0 || form.defense > 200) {
            errors.defense = 'Please, defense must be between 0 and 200';
        } else if (!expresionDate.number.test(form.defense)) {
            errors.defense = 'The required field accepts only numbers';

            // validacion speed
        } else if(!form.speed){
            errors.speed = 'Please, speed is required';
        } else if (form.speed < 0 || form.speed > 200) {
            errors.speed = 'Please, speed must be between 0 and 200';
        } else if (!expresionDate.number.test(form.speed)) {
            errors.speed = 'The required field accepts only numbers';

            //validacion types
        } else if(form.types.length === 0){
            errors.types = 'Please, at least 1 genders are required.'
        } else if(form.types.length > 2){
            errors.types = 'You can only choose 2 types per game';
        } return errors;
};



export default function CreatePokemon () {
    const pokemonEdit = useHistory().location.state
    

    const inicialForm = {
        name: pokemonEdit ? pokemonEdit.name : "",
        hp: pokemonEdit ? pokemonEdit.hp : "",
        image: pokemonEdit ? pokemonEdit.image : "",
        height: pokemonEdit ? pokemonEdit.height : "",
        weight: pokemonEdit ? pokemonEdit.weight : "",
        attack: pokemonEdit ? pokemonEdit.attack : "",
        defense: pokemonEdit ? pokemonEdit.defense : "",
        speed: pokemonEdit ? pokemonEdit.speed : "",
        types: pokemonEdit ? pokemonEdit.types.map(e => e.name) : [],
    }
    


    const {
        types,
        form, 
        error, 
        handleSearchName,
        handleClick,
        handleChange, 
        handleBlur, 
        handleSelectTypes,
        handleDeleteTypes,
        handleSubmit,
        handleEdit,
    } = useForm(inicialForm, validationForm)

// console.log(form)


    return(
        <div className="allForm">
            <br/>
                <div className="buttonBack">
                    <button onClick={(e) => {handleClick(e)}} className = "btnPagina">Back to home!</button>
                </div>
            <div>
                <br/>
                <h2>
                    {pokemonEdit ? "Edit your Pokemon" : "Create your Pokemon"}
                </h2>
                
                
            <form onSubmit={pokemonEdit ? (e)=>handleEdit(e, pokemonEdit.id) : handleSubmit }>
                <div className="formulario" id="formulario">

                    {/* ..... Nombre ..... */}
                    <div className="formulario__grupo" id="grupo__name">
                        <label className="formulario__label">Name:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="text"    
                                    name="name" 
                                    placeholder="escribe el nombre del Pokemon"
                                    onChange={handleChange}
                                    onBlur={handleSearchName}
                                    value={form.name}
                                    required
                                />
                                <i className="formulario__validacion-estado" ></i>    
                            </div>
                        {error.name && ( <p className="formulario__input-error"  >{error.name}</p> )}
                    </div>

                    {/* ..... Hp ..... */}
                    <div className="formulario__grupo" id="grupo__hp">
                        <label className="formulario__label">Hp:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="hp"
                                    id="hp"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.hp}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.hp && ( <p className="formulario__input-error">{error.hp}</p> )}
                    </div>

                

                    {/* ..... Imagen url ..... */}
                    <div className="formulario__grupo" id="grupo__image">
                        <label className="formulario__label">Image URL:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="url"
                                    name="image"
                                    id="image"
                                    placeholder="URL of the Pokemon image"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.image}
                                    
                                />
                            <i className="formulario__validacion-estado" ></i>
                            </div>
                        {error.image && ( <p className="formulario__input-error" >{error.image}</p> )}
                    </div>

                    {/* ..... height ..... */}
                    <div className="formulario__grupo" id="grupo__height">
                        <label className="formulario__label">Height:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="height"
                                    id="height"
                                    min="0"
                                    max="200"
                                    placeholder="50"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.height}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.height && ( <p className="formulario__input-error">{error.height}</p> )}
                    </div>

                    {/* ..... weight ..... */}
                    <div className="formulario__grupo" id="grupo__weight">
                        <label className="formulario__label">Weight:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    min="0"
                                    max="9999"
                                    placeholder="350"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.weight}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.weight && ( <p className="formulario__input-error">{error.weight}</p> )}
                    </div>

                    
                    {/* ..... attack ..... */}
                    <div className="formulario__grupo" id="grupo__attack">
                        <label className="formulario__label">Attack:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="attack"
                                    id="attack"
                                    min="0"
                                    max="200"
                                    placeholder="40"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.attack}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.attack && ( <p className="formulario__input-error">{error.attack}</p> )}
                    </div>



                    {/* ..... defense ..... */}
                    <div className="formulario__grupo" id="grupo__defense">
                        <label className="formulario__label">Defense:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="defense"
                                    id="defense"
                                    min="0"
                                    max="200"
                                    placeholder="90"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.defense}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.defense && ( <p className="formulario__input-error">{error.defense}</p> )}
                    </div>



                    {/* ..... speed ..... */}
                    <div className="formulario__grupo" id="grupo__speed">
                        <label className="formulario__label">speed:</label>
                            <div className="formulario__grupo-input">
                                <input
                                    className="formulario__input"
                                    type="number"
                                    name="speed"
                                    id="speed"
                                    min="0"
                                    max="200"
                                    placeholder="120"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={form.speed}
                                    required
                                />
                            <i className="formulario__validacion-estado"  ></i>
                            </div>
                        {error.speed && ( <p className="formulario__input-error">{error.speed}</p> )}
                    </div>
                    
                    {/* ..... Tipos ..... */}
                    <div className="formulario__grupo">
                        <div>
                            <label className="formulario__label">types: </label>
                            <select 
                                className="formulario__input" 
                                onBlur={handleBlur}
                                onChange={handleSelectTypes}>
                                    
                                <option disabled={form.types.length > 0}>Select types</option>
                                {types?.map((e, i) => (
                                <option key={i} value={e.name}>{e.name}</option>
                                ))}
                            </select>
                            {error.types && ( <p className="formulario__input-error" >{error.types}</p> )}
                        </div>
                    </div>

                        {/* ..... Tipos seleccionados ..... */}
                    <div className="formulario__grupo">
                        <div>
                            <div className="formulario__label">
                                <label>types selected:</label>
                                <br/>
                                
                                <div className="type-lateral">
                                    {form.types?.map((element, i) =>
                                    <div key={i} className="box-input-element">
                                        <span> {element} </span>
                                        <button className="ButtonXF" 
                                            type="reset"
                                            onBlur={handleBlur}
                                            onClick={ ()=> handleDeleteTypes(element) }
                                        >X</button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className="formulario__grupo-btn-enviar">
                    <button 
                    type="submit" 
                    className = "btnPagina"
                    >{pokemonEdit ? "Edit" : "Create" }</button>
                    <p className="formulario__mensaje-exito" id="formulario__mensaje-exito"></p>
                </div>
            </form>
            </div>
            <br/>
            <br/>
        </div>
    )

}
