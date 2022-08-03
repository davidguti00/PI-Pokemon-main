const express = require('express');
const { Type } = require ('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const allTypes = await Type.findAll({
            order: [['name', "ASC"]]
        });
        res.status(200).json(allTypes);
    } catch (err) {
        next(err)
    }
});

module.exports = router;