const express = require('express');
const TransactionService = require('../service/transaction.service');
const validatorHandler = require('../network/middlewares/validator.handler');
// const checkRolHandler = require('../network/middlewares/checkRol.handler');
// const authHandler = require('./middlewares/auth.handler');

const {
    createTransactionDto,
    updateTransactionDto,
    getTransactionIdDto,
} = require('../data/dtos/transaction.dto');

const service = new TransactionService();
const router = express.Router();

router.get('/',
    //authHandler,
    //checkRolHandler(['user']), 
    async (req, res, next) => {
        try {
            const { limit } = req.query;
            const filter = req.query;
            const data = await service.findDB(limit, filter);
            res.json({
                success: true,
                message: 'Listo',
                data: data,
            });
        } catch (error) {
            next(error);
        }
    });



router.get(
    '/:id',
    //authHandler,
    //checkRolHandler(['user']),
    validatorHandler(getTransactionIdDto, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await service.findOneDB(id);
            res.json({
                success: true,
                message: 'Listo',
                data: data,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    //authHandler,
    //checkRolHandler(['user']),
    validatorHandler(createTransactionDto, 'body'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const data = await service.createDB(body);
            res.json({
                success: true,
                message: 'Listo',
                data: data,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/:id',
    //authHandler,
    //checkRolHandler(['user']),
    validatorHandler(getTransactionIdDto, 'params'),
    validatorHandler(updateTransactionDto, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await service.updateDB(id, body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    //authHandler,
    //checkRolHandler(['user']),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const resp = await service.deleteDB(id);
            res.json(resp);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
