const express = require('express');
const BudgetService = require('../service/budget.service');
const validatorHandler = require('../network/middlewares/validator.handler');
const {
    createBudgetDto,
    updateBudgetDto,
    getBudgetIdDto,
} = require('../data/dtos/budget.dto');

const service = new BudgetService();
const router = express.Router();

router.get('/', async (req, res, next) => {
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



router.get('/data', async (req, res, next) => {
    try {
        const { limit } = req.query;
        const filter = req.query;
        const data = await service.getBudgetData(filter);
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
    validatorHandler(getBudgetIdDto, 'params'),
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
    validatorHandler(createBudgetDto, 'body'),
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
    validatorHandler(getBudgetIdDto, 'params'),
    validatorHandler(updateBudgetDto, 'body'),
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

router.delete('/:id', validatorHandler(getBudgetIdDto, 'params'),
    async (req, res) => {
        const { id } = req.params;
        const resp = await service.deleteDB(id);
        res.json(resp);
    });

module.exports = router;
