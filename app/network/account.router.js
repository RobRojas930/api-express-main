const express = require('express');
const Boom = require('@hapi/boom');
const AccountService = require('../services/account.service');

const router = express.Router();
const service = new AccountService();

// Obtener todas las cuentas
router.get('/', async (req, res, next) => {
    try {
        const accounts = await service.find();
        res.json(accounts);
    } catch (error) {
        next(Boom.internal('Error al obtener cuentas', error));
    }
});

// Obtener una cuenta por ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await service.findOne(id);
        if (!account) {
            return next(Boom.notFound('Cuenta no encontrada'));
        }
        res.json(account);
    } catch (error) {
        next(Boom.badImplementation('Error al buscar la cuenta', error));
    }
});

// Crear una cuenta
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const newAccount = await service.create(body);
        res.status(201).json(newAccount);
    } catch (error) {
        next(Boom.badRequest('Error al crear la cuenta', error));
    }
});

// Actualizar una cuenta
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updated = await service.update(id, body);
        if (!updated) {
            return next(Boom.notFound('Cuenta no encontrada para actualizar'));
        }
        res.json(updated);
    } catch (error) {
        next(Boom.badImplementation('Error al actualizar la cuenta', error));
    }
});

// Eliminar una cuenta
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await service.delete(id);
        if (!deleted) {
            return next(Boom.notFound('Cuenta no encontrada para eliminar'));
        }
        res.status(204).send();
    } catch (error) {
        next(Boom.badImplementation('Error al eliminar la cuenta', error));
    }
});

module.exports = router;