const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', {checklists: checklists});
    } catch(e) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas'});
    }
})

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;

    try {
        let checklist = await Checklist.create({name});
        res.redirect('/checklists');
    } catch(error) {
        res.status(422).render('checklists/new', {checklists: { ...checklist, error}})
    }

})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist});
    } catch(e) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar um formulário'})
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist})
    } catch (e) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a tarefa.'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', {checklist: checklist});
    } catch(e) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir a Tarefa'});
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.update({name});
        res.redirect('/checklists');
    } catch(e) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklist: { ...checklist, errors } });
    }
})

router.delete('/:id', async (req, res) => {
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.remove();
        res.redirect('/checklists');
    } catch(e) {
        res.status(422).render('checklists', {checklist: { ...checklist, errors } });
    }
})

module.exports = router;