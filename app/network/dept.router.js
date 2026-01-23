const express = require('express');
const Boom = require('@hapi/boom');
const DeptService = require('../services/dept.service');

const router = express.Router();
const service = new DeptService();

// Obtener todos los departamentos
router.get('/', async (req, res, next) => {
    try {
        const depts = await service.find();
        res.json(depts);
    } catch (error) {
        next(Boom.internal(error.message));
    }
});

// Obtener un departamento por id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const dept = await service.findOne(id);
        if (!dept) {
            return next(Boom.notFound('Departamento no encontrado'));
        }
        res.json(dept);
    } catch (error) {
        next(Boom.internal(error.message));
    }
});

// Crear un nuevo departamento
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const newDept = await service.create(body);
        res.status(201).json(newDept);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Actualizar un departamento
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedDept = await service.update(id, body);
        if (!updatedDept) {
            return next(Boom.notFound('Departamento no encontrado'));
        }
        res.json(updatedDept);
    } catch (error) {
        next(Boom.badRequest(error.message));
    }
});

// Eliminar un departamento
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await service.delete(id);
        if (!deleted) {
            return next(Boom.notFound('Departamento no encontrado'));
        }
        res.status(204).send();
    } catch (error) {
        next(Boom.internal(error.message));
    }
});

module.exports = router;