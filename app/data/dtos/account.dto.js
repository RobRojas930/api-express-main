const Joi = require('joi');

const createAccountDto = Joi.object({
    nombre: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto.',
            'string.empty': 'El nombre es obligatorio.',
            'any.required': 'El nombre es obligatorio.'
        }),
    montoInicial: Joi.number()
        .required()
        .messages({
            'number.base': 'El monto inicial debe ser un número.',
            'any.required': 'El monto inicial es obligatorio.'
        }),
    montoActual: Joi.number()
        .required()
        .messages({
            'number.base': 'El monto actual debe ser un número.',
            'any.required': 'El monto actual es obligatorio.'
        }),
    descripcion: Joi.string()
        .allow('')
        .messages({
            'string.base': 'La descripción debe ser un texto.'
        }),
    userId: Joi.string()
        .required()
        .messages({
            'string.base': 'El userId debe ser un texto.',
            'any.required': 'El userId es obligatorio.'
        }),
    color: Joi.string()
        .allow('')
        .messages({
            'string.base': 'El color debe ser un texto.'
        }),
    tipoCuenta: Joi.string()
        .required()
        .messages({
            'string.base': 'El tipo de cuenta debe ser un texto.',
            'any.required': 'El tipo de cuenta es obligatorio.'
        })
});

const updateAccountDto = Joi.object({
    nombre: Joi.string()
        .messages({
            'string.base': 'El nombre debe ser un texto.'
        }),
    montoInicial: Joi.number()
        .messages({
            'number.base': 'El monto inicial debe ser un número.'
        }),
    montoActual: Joi.number()
        .messages({
            'number.base': 'El monto actual debe ser un número.'
        }),
    descripcion: Joi.string()
        .allow('')
        .messages({
            'string.base': 'La descripción debe ser un texto.'
        }),
    color: Joi.string()
        .allow('')
        .messages({
            'string.base': 'El color debe ser un texto.'
        }),
    tipoCuenta: Joi.string()
        .messages({
            'string.base': 'El tipo de cuenta debe ser un texto.'
        })
});

const getAccountByIdDto = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.base': 'El id debe ser un texto.',
            'any.required': 'El id es obligatorio.'
        })
});

module.exports = {
    createAccountDto,
    updateAccountDto,
    getAccountByIdDto
};