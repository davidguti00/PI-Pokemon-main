const { Router } = require('express');
const pokemonControllers = require ("../controllers/pokemon_controllers");
const typeControllers = require ("../controllers/type_controllers");


const router = Router();

router.use('/pokemon', pokemonControllers);
router.use('/type', typeControllers);




module.exports = router;
