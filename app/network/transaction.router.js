const express = require('express');
const TransactionService = require('../service/transactions.service');
const validatorHandler = require('../network/middlewares/validator.handler');
const {
    createTransactionDto,
    updateTransactionDto,
    getTransactionIdDto,
} = require('../data/dtos/transaction.dto');

const service = new TransactionService();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { limit } = req.query;
        const filter = req.body;
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

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const resp = await service.deleteDB(id);
        res.json(resp);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
