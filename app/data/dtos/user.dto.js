const Joi = require('joi'); const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const name = Joi.string();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = joiPassword
  .string()
  .minOfSpecialCharacters(2)
  .minOfLowercase(2)
  .minOfUppercase(2)
  .minOfNumeric(2)
  .noWhiteSpaces()
  .messages({
    'string.minOfSpecialCharacters': 'La contraseña debe contener al menos {#min} caracteres especiales.',
    'string.minOfLowercase': 'La contraseña debe contener al menos {#min} letras minúsculas.',
    'string.minOfUppercase': 'La contraseña debe contener al menos {#min} letras mayúsculas.',
    'string.minOfNumeric': 'La contraseña debe contener al menos {#min} números.',
    'string.noWhiteSpaces': 'La contraseña no debe contener espacios en blanco.'
  });

const loginDto = Joi.object({
  email: email.required().messages({
    'any.required': 'El correo electrónico es obligatorio.',
    'string.empty': 'El correo electrónico no puede estar vacío.',
    'string.email': 'El correo electrónico debe tener un formato válido.',
  }),
  password: password.required().messages({
    'any.required': 'La contraseña es obligatoria.',
    'string.empty': 'La contraseña no puede estar vacía.'
  }),
});
const registerDto = Joi.object({
  name: name.required().messages({
    'any.required': 'El nombre es obligatorio.',
    'string.empty': 'El nombre no puede estar vacío.',
  }),
  email: email.required().messages({
    'any.required': 'El correo electrónico es obligatorio.',
    'string.empty': 'El correo electrónico no puede estar vacío.',
    'string.email': 'El correo electrónico debe tener un formato válido.',
  }),
  password: password.required().messages({
    'any.required': 'La contraseña es obligatoria.',
    'string.empty': 'La contraseña no puede estar vacía.'
  }),
});

module.exports = { loginDto, registerDto };
