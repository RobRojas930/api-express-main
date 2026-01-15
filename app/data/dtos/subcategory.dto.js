const Joi = require('joi');//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(15).messages({
  'string.base': 'El nombre debe ser un texto.',
  'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
  'string.max': 'El nombre no debe exceder los {#limit} caracteres.',
  'string.empty': 'El nombre no puede estar vacío.'
});

const createSubCategoryDto = Joi.object({
  name: name.required().messages({
    'any.required': 'El nombre es obligatorio.'
  }),
});
const updateSubCategoryDto = Joi.object({
  name: name,
});

const getSubCategoryIdDto = Joi.object({
  id: id.required().messages({
    'any.required': 'El id de la subcategoría es obligatorio.'
  }),
});

module.exports = {
  createSubCategoryDto,
  updateSubCategoryDto,
  getSubCategoryIdDto,
};
