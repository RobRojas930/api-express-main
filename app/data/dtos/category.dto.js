const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const idProduct = Joi.string();
const name = Joi.string().alphanum().min(3).max(15);
const description = Joi.string().min(3).max(100);
const color = Joi.string().min(3).max(30);
const icon = Joi.string().min(3).max(50);

const createCategoryDto = Joi.object({
  id: id.optional().allow(null).allow(''),
  name: name.required(),
  description: description.required(),
  color: color.required(),
  icon: icon.required(),
});
const updateCategoryDto = Joi.object({
  name: name,
  description: description,
  color: color,
  icon: icon,
});

const getCategoryIdDto = Joi.object({
  id: id.required(),
});

const getProductId = Joi.object({
  idProduct: idProduct.required(),
});


module.exports = { createCategoryDto, updateCategoryDto, getCategoryIdDto, getProductId };
