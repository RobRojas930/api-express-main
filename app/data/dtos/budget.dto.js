const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const categoryId = Joi.string();
const userId = Joi.string();
const title = Joi.string().min(3).max(15);
const initialAmount = Joi.number();
const currentAmount = Joi.number();
const percentage = Joi.number().min(0).max(100);
const color = Joi.string().min(3).max(30);

const createBudgetDto = Joi.object({
    id: id.optional().allow(null).allow(''),
    userId: userId.required(),
    categoryId: categoryId.required(),
    title: title.required(),
    initialAmount: initialAmount.required().allow(0),
    currentAmount: currentAmount.optional().allow(null).allow('').allow(0),
    percentage: percentage.optional().allow(null).allow('').allow(0),
    color: color.optional(),
});
const updateBudgetDto = Joi.object({
    id: id.optional().allow(null).allow(''),
    userId: userId,
    categoryId: categoryId,
    title: title,
    initialAmount: initialAmount,
    currentAmount: currentAmount,
    percentage: percentage,
    color: color,
});



const getCategoryIdDto = Joi.object({
    categoryId: categoryId.required(),
});

const getBudgetIdDto = Joi.object({
    id: id.required(),
});


module.exports = { createBudgetDto, updateBudgetDto, getCategoryIdDto, getBudgetIdDto };
