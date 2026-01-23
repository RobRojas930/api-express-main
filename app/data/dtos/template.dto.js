const Joi = require('joi');

// Create DTO
const crearPlantillaDto = Joi.object({
    titulo: Joi.string()
        .trim()
        .required()
        .messages({
            'string.base': 'Title must be a string.',
            'string.empty': 'Title is required.',
            'any.required': 'Title is required.'
        }),
    descripcion: Joi.string()
        .trim()
        .allow('')
        .messages({
            'string.base': 'Description must be a string.'
        }),
    idCategoria: Joi.string()
        .required()
        .messages({
            'string.base': 'CategoryId must be a string.',
            'any.required': 'CategoryId is required.'
        }),
    monto: Joi.number()
        .required()
        .messages({
            'number.base': 'Amount must be a number.',
            'any.required': 'Amount is required.'
        }),
    tipo: Joi.string()
        .valid('income', 'expense')
        .required()
        .messages({
            'string.base': 'Type must be a string.',
            'any.only': 'Type must be either "income" or "expense".',
            'any.required': 'Type is required.'
        }),
    transaccion: Joi.string()
        .trim()
        .allow('')
        .messages({
            'string.base': 'Transaction must be a string.'
        }),
    idCuenta: Joi.string()
        .required()
        .messages({
            'string.base': 'AccountId must be a string.',
            'any.required': 'AccountId is required.'
        })
});

// Update DTO
const actualizarPlantillaDto = Joi.object({
    titulo: Joi.string()
        .trim()
        .messages({
            'string.base': 'Title must be a string.'
        }),
    descripcion: Joi.string()
        .trim()
        .allow('')
        .messages({
            'string.base': 'Description must be a string.'
        }),
    idCategoria: Joi.string()
        .messages({
            'string.base': 'CategoryId must be a string.'
        }),
    monto: Joi.number()
        .messages({
            'number.base': 'Amount must be a number.'
        }),
    tipo: Joi.string()
        .valid('income', 'expense')
        .messages({
            'string.base': 'Type must be a string.',
            'any.only': 'Type must be either "income" or "expense".'
        }),
    transaccion: Joi.string()
        .trim()
        .allow('')
        .messages({
            'string.base': 'Transaction must be a string.'
        }),
    idCuenta: Joi.string()
        .messages({
            'string.base': 'AccountId must be a string.'
        })
});

// GetById DTO
const obtenerPlantillaPorIdDto = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.base': 'Id must be a string.',
            'any.required': 'Id is required.'
        })
});

module.exports = {
    crearPlantillaDto,
    actualizarPlantillaDto,
    obtenerPlantillaPorIdDto
};