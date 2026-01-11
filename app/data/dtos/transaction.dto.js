const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const title = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(100);
const amount = Joi.number().positive();
const date = Joi.date();
const type = Joi.string().valid('income', 'expense');
const category = Joi.object();
const userId = Joi.string();

const createTransactionDto = Joi.object({
    id: id.optional().allow(null).allow(''),
    userId: userId.required(),
    title: title.required(),
    description: description.required(),
    amount: amount.required(),
    date: date.required(),
    type: type.required(),
    category: category.optional(),
});

const updateTransactionDto = Joi.object({
    userId: userId,
    title: title,
    description: description,
    amount: amount,
    date: date,
    type: type,
    category: category,
});

const getTransactionIdDto = Joi.object({
    id: id.required(),
});

module.exports = { createTransactionDto, updateTransactionDto, getTransactionIdDto };
