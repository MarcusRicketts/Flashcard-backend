const Collection = require('../models/Collection');
const {Card} = require('../models/Card');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const collections = await Collection.find();
        return res.send(collections);
    }catch (ex) {
        return res.status(400).send(`Database Error: ${ex}`);
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
    const {error} = validateCollection(req.body);
    if (error){
        return res.status(400).send(error);
    }
    let collection = new Collection({
        title: req.body.title,
        cards:[],
    })
    try{
        const result = await collection.save();
        return res.send(result);
    } catch(error){
        return res.status(400).send(`Database Error: ${error}`);
    }
   

});

router.post('/:cards', async (req,res)=> {
    const {error} = validateCard(req.body);
    if (error){
        return res.status(400).send(error);
    }
    
    try{
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The user with id "${req.params.collectionId}" does not exist.`);

        // const card = await Card.findById(req.params.cardId);
        // if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
//create card

        let card = new Card({
        category: req.body.category,
        question: req.body.question,
        answer: req.body.answer,
    })

        
        collection.cards.push(card);

        // await collection.save();
        return res.send(collection.card);
    } catch (ex) {
        return res.status(400).send(`Internal Server Error: ${ex}`);
    }
});
function validateCollection(collection){
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
    });
    return schema.validate(collection);
}

function validateCard(card){
    const schema= Joi.object({
        category: Joi.string().min(1).required(),
        question: Joi.string().min(1).required(),
        answer: Joi.string().required(),
    });
    return schema.validate(card);
}



module.exports = router;