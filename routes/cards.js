const Card = require('../models/Card')
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const cards = await Card.find();
        return res.send(cards);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const cards = await Card.findById(req.params.id);

        if (!cards)
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