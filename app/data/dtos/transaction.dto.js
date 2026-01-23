const Joi = require('joi');//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const title = Joi.string().min(3).max(50);
const description = Joi.string().min(3).max(100);
const amount = Joi.number().positive();
const date = Joi.date();
const type = Joi.string().valid('income', 'expense');
const category = Joi.object();
const userId = Joi.string();
const accountId = Joi.string();

const createTransactionDto = Joi.object({
    id: id.optional().allow(null).allow(''),
    userId: userId.optional().allow(null).allow(''),
    title: title.required().messages({
        'any.required': 'El título es obligatorio.',
        'string.min': 'El título debe tener al menos {#limit} caracteres.',
        'string.max': 'El título no debe exceder los {#limit} caracteres.',
    }),
    description: description.required().messages({
        'any.required': 'La descripción es obligatoria.',
        'string.min': 'La descripción debe tener al menos {#limit} caracteres.',
        'string.max': 'La descripción no debe exceder los {#limit} caracteres.',
    }),
    amount: amount.required().messages({
        'any.required': 'El monto es obligatorio.',
        'number.positive': 'El monto debe ser un número positivo.',
    }),
    date: date.required().messages({
        'any.required': 'La fecha es obligatoria.',
        'date.base': 'La fecha debe ser una fecha válida.',
    }),
    type: type.required().messages({
        'any.required': 'El tipo es obligatorio.',
        'any.only': 'El tipo debe ser "income" o "expense".',
    }),
    category: category.optional(),
    accountId: accountId.optional().allow(null).allow(''),
});

const updateTransactionDto = Joi.object({
    userId: userId.optional().allow(null).allow(''),
    title: title,
    description: description,
    amount: amount,
    date: date,
    type: type,
    category: category,
    accountId: accountId.optional().allow(null).allow(''),
});

const getTransactionIdDto = Joi.object({
    id: id.required(),
});

module.exports = { createTransactionDto, updateTransactionDto, getTransactionIdDto };
