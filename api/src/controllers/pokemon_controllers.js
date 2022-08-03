
const express = require('express');
const router = express.Router();
const {Op} = require ('sequelize');
const { Pokemon, Type} = require ('../db');
const { getPokemonsApi, getPokemonsByNameApi, getPokemonsByNameApiSearch, getPokemonsByIdApi } = require ("./functionApi");
const { getPokemonsDb, getPokemonsByNameDb, getPokemonsByNameDbSearch, getPokemonsByIdDb } = require ("./functionDb")


router.get('/searchNameForm', async (req, res, next)=>{
    const { name } = req.query 
    try {
        const dataNameApi = await getPokemonsByNameApiSearch(name)
        const dataNameDb = await getPokemonsByNameDbSearch(name)
        
        if(dataNameApi || dataNameDb) res.status(201).send(`The name ${name} already exist`)
    
    } catch (error) {
        next (error)
    }
});

router.get('/', async (req, res, next) => {
    const { name } = req.query
    if(name){
        try {
            let dataName = await getPokemonsByNameDb(name)
            if(dataName === null) dataName = await getPokemonsByNameApi(name)

            return res.status(200).json(dataName);
        }catch (error) {
            res.status(404).send(`Pokemon "${name}" not found`)
        }
    } else{
        try {
            const dataApi = await getPokemonsApi(); 
            const dataDb = await getPokemonsDb();   
            //console.log(dataDb);
            const finalConcat = dataDb.concat(dataApi);

            if(!finalConcat.length) return res.status(404).send('Api not found');
            return res.status(200).json(finalConcat);
        } catch (error) {
            next(error)
        }
    }
});



router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    if(id.length > 8){
        try{
            const pokemonIdDb = await getPokemonsByIdDb(id);
            res.status(200).json(pokemonIdDb);
        } catch (error) {
            next(error)
        }
    }else{
        try {
            const pokemonIdApi = await getPokemonsByIdApi(id);
            res.status(200).json(pokemonIdApi);
            //console.log('respuesta de la api para detalles',pokemonIdApi)
        } catch (error) {
            next(error)
        }
    }
});



router.post('/', async (req, res, next)=>{
    const { name, image, height, weight, hp, attack, defense, speed, types } = req.body
    const nameMinuscule = name.toLowerCase()
    try {
        if( name &&  height && weight && hp && attack && defense && speed && types ){     
            const [newPokemon, created] = await Pokemon.findOrCreate({
                where:{
                    name: nameMinuscule,
                },
                defaults:{
                    image,
                    height,
                    weight,
                    hp,
                    attack,
                    defense,
                    speed,
                }
            })
            let typeFind = await Type.findAll({
                where:{
                    name:{
                        [Op.or]: types
                    }
                }
            })
            await newPokemon.addType(typeFind)

            if(!created)  res.status(200).send(`The Pokemon "${name}" cannot  be created because it already exists`)
            return res.status(201).send(`The Pokemon "${name}" updated successfully`)

        } return res.status(200).send("Missing data")
        
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next)=>{
    const {id} = req.params
    //console.log('este es el id que llega del front ......',id)
    try {
        await Pokemon.destroy({
            where: {id:id}
        })
        res.status(200).send("the Pokemon was successfully deleted")
    } catch (error) {
        next(error)
    }
});

// router.put('/:id', async (req, res, next)=>{
//     const {id} = req.params
//     const { name, image, height, weight, hp, attack, defense, speed, types } = req.body
//     try {
//         await Pokemon.update({
//             name: name,
//             image: image,
//             height: height,
//             weight: weight,
//             hp: hp,
//             attack: attack,
//             defense: defense,
//             speed: speed,
//         },{
//             where:{id},
//         })

//         let typeFind = await Type.findAll({
//             where:{
//                 name:{
//                     [Op.or]: types
//                 }
//             }
//         })
//         await newPokemon.addType(typeFind)

//         res.status(200).send("the Pokemon was successfully modified")
//     } catch (error) {
//         next(error)
//     }
// });

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, image, hp, attack, defense, speed, height, weight, types  } = req.body
    try {
        const pokemonUpdated = await Pokemon.findOne({ where: { id }, include: Type })

        const oldTypes = pokemonUpdated.types.map(types => types.dataValues.id)
        await pokemonUpdated.removeTypes(oldTypes)
        
        const typesDB = await Type.findAll({ where: { name: { [Op.or]: types } } })
        await pokemonUpdated.addTypes(typesDB.map(type => type.dataValues.id))

        pokemonUpdated.set({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight
        })
        await pokemonUpdated.save()
        res.status(200).send(`Pokemon "${name}" updated successfully`)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})



module.exports = router;
