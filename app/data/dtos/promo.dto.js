const Joi = require('joi');
//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const title = Joi.string().min(5).max(15).messages({
  'string.base': 'El título debe ser un texto.',
  'string.min': 'El título debe tener al menos {#limit} caracteres.',
  'string.max': 'El título no debe exceder los {#limit} caracteres.',
  'string.empty': 'El título no puede estar vacío.'
});
const description = Joi.string().min(5).max(15).messages({
  'string.base': 'La descripción debe ser un texto.',
  'string.min': 'La descripción debe tener al menos {#limit} caracteres.',
  'string.max': 'La descripción no debe exceder los {#limit} caracteres.',
  'string.empty': 'La descripción no puede estar vacía.'
});
const dateStart = Joi.date();
const dateEnd = Joi.date();
const coupon = Joi.string().min(4).max(6).messages({
  'string.base': 'El cupón debe ser un texto.',
  'string.min': 'El cupón debe tener al menos {#limit} caracteres.',
  'string.max': 'El cupón no debe exceder los {#limit} caracteres.',
  'string.empty': 'El cupón no puede estar vacío.'
});
const isActive = Joi.boolean();

const createPromoDto = Joi.object({
  title: title.required().messages({
    'any.required': 'El título es obligatorio.'
  }),
  description: description.required().messages({
    'any.required': 'La descripción es obligatoria.'
  }),
  dateStart: dateStart.required().messages({
    'any.required': 'La fecha de inicio es obligatoria.'
  }),
  dateEnd: dateEnd.required().messages({
    'any.required': 'La fecha de fin es obligatoria.'
  }),
  coupon: coupon.required().messages({
    'any.required': 'El cupón es obligatorio.'
  }),
  isActive: isActive.required().messages({
    'any.required': 'El estado es obligatorio.'
  }),
});

const updatePromoDto = Joi.object({
  title: title,
  description: description,
  dateStart: dateStart,
  dateEnd: dateEnd,
  coupon: coupon,
  isActive: isActive,
});

const getPromoIdDto = Joi.object({
  id: id.required().messages({
    'any.required': 'El id de la promoción es obligatorio.'
  }),
});

module.exports = { createPromoDto, updatePromoDto, getPromoIdDto };
