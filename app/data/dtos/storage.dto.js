const Joi = require('joi');//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const name = Joi.string().messages({
  'string.base': 'El nombre debe ser un texto.',
  'string.empty': 'El nombre no puede estar vacío.'
});
const filename = Joi.string().messages({
  'string.base': 'El nombre del archivo debe ser un texto.',
  'string.empty': 'El nombre del archivo no puede estar vacío.'
});
const path = Joi.date().messages({
  'date.base': 'La fecha debe ser válida.',
  'any.required': 'La fecha es obligatoria.'
});

const createStorageDto = Joi.object({
  name: name.required().messages({
    'any.required': 'El nombre es obligatorio.'
  }),
  filename: filename.required().messages({
    'any.required': 'El nombre del archivo es obligatorio.'
  }),
  path: path.required().messages({
    'any.required': 'La fecha es obligatoria.'
  }),
});

const updateStorageDto = Joi.object({
  name:name,
  filename:filename,
  path:path,
});

const getStorageIdDto = Joi.object({
  id: id.required().messages({
    'any.required': 'El id del almacenamiento es obligatorio.'
  }),
});

module.exports = { createStorageDto, updateStorageDto, getStorageIdDto };
