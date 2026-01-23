const Joi = require('joi');

const createSavingDto = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.empty': 'El nombre es obligatorio.',
        'any.required': 'El nombre es obligatorio.',
    }),
    description: Joi.string().required().messages({
        'string.base': 'La descripción debe ser un texto.',
        'string.empty': 'La descripción es obligatoria.',
        'any.required': 'La descripción es obligatoria.',
    }),
    amountToSave: Joi.number().required().messages({
        'number.base': 'El monto a ahorrar debe ser un número.',
        'any.required': 'El monto a ahorrar es obligatorio.',
    }),
    savedAmount: Joi.number().required().default(0).messages({
        'number.base': 'El monto ahorrado debe ser un número.',
        'any.required': 'El monto ahorrado es obligatorio.',
    }),
    color: Joi.string().optional().messages({
        'string.base': 'El color debe ser un texto.',
    }),
});

const updateSavingDto = Joi.object({
    name: Joi.string().optional().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.empty': 'El nombre no puede estar vacío.',
    }),
    description: Joi.string().optional().messages({
        'string.base': 'La descripción debe ser un texto.',
        'string.empty': 'La descripción no puede estar vacía.',
    }),
    amountToSave: Joi.number().optional().messages({
        'number.base': 'El monto a ahorrar debe ser un número.',
    }),
    savedAmount: Joi.number().optional().messages({
        'number.base': 'El monto ahorrado debe ser un número.',
    }),
    color: Joi.string().optional().messages({
        'string.base': 'El color debe ser un texto.',
    }),
});

const getByIdDto = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'El id debe ser un texto.',
        'string.empty': 'El id es obligatorio.',
        'any.required': 'El id es obligatorio.',
    }),
});

module.exports = {
    createSavingDto,
    updateSavingDto,
    getByIdDto,
};
