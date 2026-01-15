const Joi = require('joi');
//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const name = Joi.string().min(3).max(15).messages({
  'string.base': 'El nombre debe ser un texto.',
  'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
  'string.max': 'El nombre no debe exceder los {#limit} caracteres.',
  'string.empty': 'El nombre no puede estar vacío.'
});
const price = Joi.number().integer().min(10).messages({
  'number.base': 'El precio debe ser un número.',
  'number.min': 'El precio debe ser al menos {#limit}.',
  'any.required': 'El precio es obligatorio.'
});
const image = Joi.string().messages({
  'string.base': 'La imagen debe ser un texto.',
  'string.empty': 'La imagen no puede estar vacía.'
});
const brand = Joi.string().messages({
  'string.base': 'La marca debe ser un texto.',
  'string.empty': 'La marca no puede estar vacía.'
});
const idCategory = Joi.string().messages({
  'string.base': 'El id de la categoría debe ser un texto.',
  'string.empty': 'El id de la categoría no puede estar vacío.'
});
const subCategories = Joi.array();
const count = Joi.number().integer().min(0).messages({
  'number.base': 'El conteo debe ser un número.',
  'number.min': 'El conteo no puede ser negativo.',
  'any.required': 'El conteo es obligatorio.'
});

const createProductDto = Joi.object({
  name: name.required().messages({
    'any.required': 'El nombre es obligatorio.'
  }),
  image: image.required().messages({
    'any.required': 'La imagen es obligatoria.'
  }),
  price: price.required().messages({
    'any.required': 'El precio es obligatorio.'
  }),
  categories: subCategories.required().messages({
    'any.required': 'Las categorías son obligatorias.'
  }),
  idCategory: idCategory.required().messages({
    'any.required': 'El id de la categoría es obligatorio.'
  }),
  subCategories: subCategories.required().messages({
    'any.required': 'Las subcategorías son obligatorias.'
  }),
  count: count.required().messages({
    'any.required': 'El conteo es obligatorio.'
  }),
});

const updateProductDto = Joi.object({
  name: name,
  image: image,
  price: price,
  categories: subCategories,
  brand: brand,
  idCategory: idCategory,
  subCategories: subCategories,
  count: count,
});

const getProductIdDto = Joi.object({
  id: id.required().messages({
    'any.required': 'El id del producto es obligatorio.'
  }),
});

module.exports = { createProductDto, updateProductDto, getProductIdDto };
