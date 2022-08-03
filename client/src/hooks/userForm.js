import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { getTypes, updatePokemon, postPokemon, getNameForm, clearHome } from "../redux/actions.js";


export const useForm = (inicialForm, validateForm)=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    
    

    const[form, setForm] = useState(inicialForm);
    const[error, setErrors] = useState({});
    const[errorName, setErrorName] = useState ("");
// console.log(form);


    const handleChange = (e) => {
        const{name, value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
        setErrors(validateForm(form));
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSearchName = (e) => {
        e.preventDefault()
        handleBlur(e);
        const{value} = e.target;
        dispatch(getNameForm(value)).then((res)=>{
            //console.log('Esto es la respuesta del .then',res)
            setErrorName(value)
            alert(res)
        })
    }

    const handleSelectTypes = (e) => {
        const{value} = e.target;
            if(value !== 'Select Type')
                if(!form.types.includes(value)){
                    setForm({
                        ...form,
                        types: [...form.types, value],
                    });
                    setErrors(validateForm(form));
                }    
    }

    const handleDeleteTypes = (element) => {
        setForm({
            ...form,
            types: form.types.filter(e => e !== element)
        })
    }

    const handleClick= (e) => {
        e.preventDefault()
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes())
    
    }, [dispatch])

    const  handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateForm(form))
        //console.log('Este es el objeto error', Object.keys(error).length)
        //console.log('ESTE ES EL NAME QUE ME LLEGA ANTES DEL SUBMIT', errorName)
        if(!form.types.length){
            alert('Need to add at least one type of Pokemon')
        }else{
            if(Object.keys(error).length === 0 && errorName !== form.name){
                localStorage.clear()
                alert ("submitting form");
                dispatch(postPokemon(form))
                .then((res)=>{
                console.log(res)
                history.push('/home')
                localStorage.clear()
                alert(res)
                })
                dispatch(clearHome())
            } else {
                alert('missing data or errors in data loading') 
            }
        }
    };

    const handleEdit = (e,id) => {
        setErrors(validateForm(form))
        if(Object.keys(error).length === 0 && errorName !== form.name){
            //console.log('ESTO ES LO QUE LLEGA AL EDIT',form)
            //console.log('ESTO ES LO QUE LLEGA AL EDIT IDDDDDDD ',id)
            let respuesta = window.confirm('Are you sure you want to edit the pokemon?')
            if (respuesta === true){
                dispatch(updatePokemon(id,form))
                alert(`Pokemon "${form.name}" updated successfully`)
                history.push('/home')
                dispatch(clearHome())
            }
        } else {
            alert('missing data or errors in data loading')
            
        }                   
    }

    return{
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
    }
}