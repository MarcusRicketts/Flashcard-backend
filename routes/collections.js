const {Collection} = require('../models/collection');
const {Card, validate } = require('../models/card');
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

        const card = new Card({
            category: req.body.category,
            question: req.body.question,
            answer: req.body.answer,

        });
        await card.save();

        return res.send(card);


    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/:collectionId/flashcard/:cardId', async (req,res)=> {
    try{
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The user with id "${req.params.collectionId}" does not exist.`);

        const card = await Card.findById(req.params.cardId);
        if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);

        collection.flashcard.push(card);

        await collection.save();
        return res.send(collection.flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



module.exports = router;