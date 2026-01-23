const Joi = require('joi');

// Esquema para crear un dept
const createDeptDto = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto.',
            'string.empty': 'El nombre es obligatorio.',
            'any.required': 'El nombre es obligatorio.'
        }),
    description: Joi.string()
        .allow('')
        .messages({
            'string.base': 'La descripción debe ser un texto.'
        }),
    amount: Joi.number()
        .required()
        .messages({
            'number.base': 'El monto debe ser un número.',
            'any.required': 'El monto es obligatorio.'
        }),
    amountPaid: Joi.number()
        .default(0)
        .messages({
            'number.base': 'El monto pagado debe ser un número.'
        })
});

// Esquema para actualizar un dept
const updateDeptDto = Joi.object({
    name: Joi.string()
        .messages({
            'string.base': 'El nombre debe ser un texto.'
        }),
    description: Joi.string()
        .allow('')
        .messages({
            'string.base': 'La descripción debe ser un texto.'
        }),
    amount: Joi.number()
        .messages({
            'number.base': 'El monto debe ser un número.'
        }),
    amountPaid: Joi.number()
        .messages({
            'number.base': 'El monto pagado debe ser un número.'
        })
});

// Esquema para obtener por id
const getDeptByIdDto = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.base': 'El id debe ser un texto.',
            'string.empty': 'El id es obligatorio.',
            'any.required': 'El id es obligatorio.'
        })
});

module.exports = {
    createDeptDto,
    updateDeptDto,
    getDeptByIdDto
};