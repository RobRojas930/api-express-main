const express = require('express');
const Boom = require('@hapi/boom');
const SavingService = require('../services/saving.service');

const router = express.Router();
const service = new SavingService();

// Obtener todos los savings
router.get('/', async (req, res, next) => {
    try {
        const savings = await service.find();
        res.json(savings);
    } catch (error) {
        next(Boom.internal(error.message));
    }
});

// Obtener un saving por id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const saving = await service.findOne(id);
        if (!saving) {
            return next(Boom.notFound('Saving not found'));
        }
        res.json(saving);
    } catch (error) {
        next(Boom.internal(error.message));
    }
});

// Crear un nuevo saving
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const newSaving = await service.create(body);
        res.status(201).json(newSaving);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Actualizar un saving
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedSaving = await service.update(id, body);
        res.json(updatedSaving);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Eliminar un saving
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(204).send();
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

module.exports = router;