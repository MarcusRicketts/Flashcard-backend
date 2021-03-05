const {Collection, validate } = require('../models/Collection');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const collections = await Collection.find();
        return res.send(collections);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if (!collection)
        return res.status(400).send(`The card with id "${req.params.id}" does not exist. `);
        return res.send(collection);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });


router.post('/', async (req,res)=> {
    try{
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const collection = new Collectoin({
            category: req.body.category,
            topic: req.body.topic,
        });
        await collection.save();

        return res.send(collection);


    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;