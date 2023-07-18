const express = require('express');
const router = express.Router();
const NewGameData = require('../models/newGameData')
const RealGameData =  require('../models/realGameData')

router.get('/', async (req, res) => {
    try {
        const gameData = await RealGameData.find();
        res.json(gameData);
    } catch (error) {
        res.status(500).json({ message : err.message});
    }
});

router.get('/:id', getSubscriberMiddleware, async (req, res) => {
    try {
        res.json(res.gameData);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
});

router.post('/', async (req, res) => {
    const gameData = new RealGameData({...req.body})
    try {
        const newGameData = await gameData.save();
        res.status(201).json(newGameData);
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
});

router.patch('/:id', getSubscriberMiddleware, async (req, res) => {
    if(req.body.name != null)
        res.gGameData.body = req.body.name;

    try {
        const updatedData = await res.gameData.save();
        res.status(201).json(updatedData);
    } catch (error) {
        res.status(400).json({ message : error.message });
    }

});

router.delete('/:id', getSubscriberMiddleware, async (req, res) => {
    try {
        const deletedData = await res.gameData.deleteOne();
        res.status(201).json(deletedData);
    } catch (error) {
        res.status(500).json({ message : error.message });
    } 
});

async function getSubscriberMiddleware(req, res, next) {
    let gameData;
    try {
        gameData = await RealGameData.findById(req.params.id)
        if (gameData == null)
            return res.status(404).json({ message : 'Cannot find Game Data'});
    } catch (error) {
        return res.status(500).json({ message : err.message });
    }
    res.gameData = gameData;
    next();
}

module.exports = router;