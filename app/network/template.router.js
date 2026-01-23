const express = require('express');
const Boom = require('@hapi/boom');
const TemplateService = require('../services/template.service');

const router = express.Router();
const service = new TemplateService();

// Obtener todos los templates
router.get('/', async (req, res, next) => {
    try {
        const templates = await service.find();
        res.json(templates);
    } catch (error) {
        next(Boom.badImplementation(error.message));
    }
});

// Obtener un template por id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await service.findOne(id);
        if (!template) {
            return next(Boom.notFound('Template not found'));
        }
        res.json(template);
    } catch (error) {
        next(Boom.badImplementation(error.message));
    }
});

// Crear un nuevo template
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const newTemplate = await service.create(body);
        res.status(201).json(newTemplate);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Actualizar un template
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedTemplate = await service.update(id, body);
        if (!updatedTemplate) {
            return next(Boom.notFound('Template not found'));
        }
        res.json(updatedTemplate);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Eliminar un template
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await service.delete(id);
        if (!deleted) {
            return next(Boom.notFound('Template not found'));
        }
        res.status(204).send();
    } catch (error) {
        next(Boom.badImplementation(error.message));
    }
});

module.exports = router;