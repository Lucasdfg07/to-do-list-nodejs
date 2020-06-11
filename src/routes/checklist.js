const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send();
})

router.post('/', (req, res) => {
    res.status(200).json(req.body);
})

router.get('/:id', (req, res) => {
    res.send(`ID: ${req.params.id}`);
})

router.put('/:id', (req, res) => {
    res.send(`PUT ID: ${req.params.id}`);
})

router.delete('/:id', (req, res) => {
    res.send(`DELETE ID: ${req.params.id}`);
})

module.exports = router;