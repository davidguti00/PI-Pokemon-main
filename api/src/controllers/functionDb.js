
const {Op} = require ('sequelize');
const { Type, Pokemon } = require ("../db")

module.exports = {
    getPokemonsDb : async () => {
        try {
            const pokemonsDb = await Pokemon.findAll({
                attributes:[
                    'id',
                    'name',
                    'image',
                    'hp',
                    'attack',
                    'defense',
                    'speed',
                    'height',
                    'weight',
                    'createdInDb',
                ],
                include:{
                    model: Type,
                    attributes:['name'],
                    through: {
                        attribute:[]
                    }
                },
                attributes:{
                    exclude:['createdAt','updatedAt']
                    
                }
            })
            return  pokemonsDb;

        } catch (error) {
            console.log(error)
            return error
        }
    },

    getPokemonsByNameDb : async (name) => {
        try {
            let nameDb = await Pokemon.findOne({ 
                where: { 
                    name: {[Op.iLike]: name },
                }, 
                include:{
                    model:Type,
                    attributes:['name'],
                    through: {
                        attribute:[]
                    }
                },
                attributes:{
                    exclude:['createdInDb','createdAt','updatedAt']
                    
                }
                
            });

            return nameDb;

        } catch (error) {
            console.log (error)
            throw error 
        }
    },

    getPokemonsByNameDbSearch : async (name) => {
        try {
            let nameDb = await Pokemon.findOne({ 
                where: { 
                    name: {[Op.iLike]: name },
                }, 
                include:{
                    model:Type,
                    attributes:['name'],
                    through: {
                        attribute:[]
                    }
                },
                attributes:{
                    exclude:['createdInDb','createdAt','updatedAt']
                    
                }
                
            });

            return nameDb;

        } catch (error) {
            console.log (error)
        }
    },


    getPokemonsByIdDb : async (id) => {
        try {
            const pokemonId = await Pokemon.findByPk(id,{
                include:{
                    model: Type,
                    attributes:['name'],
                }
            });
            return pokemonId;
            
        } catch (error) {
            console.log(error)
            return error
        }
    }


}