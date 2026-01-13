const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const idProduct = Joi.string();
const categoryId = Joi.string();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(3).max(100);
const color = Joi.string().min(3).max(30);
const icon = Joi.string().min(3).max(50);
const userId = Joi.string();

const createCategoryDto = Joi.object({
  id: id.optional().allow(null).allow(''),
  categoryId: categoryId.optional().allow(null).allow(''),
  userId: userId.required(),
  name: name.required(),
  description: description.required(),
  color: color.required(),
  icon: icon.required(),
});
const updateCategoryDto = Joi.object({
  id: id.optional().allow(null).allow(''),
  categoryId: categoryId,
  name: name,
  userId: userId,
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
