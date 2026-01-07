const Joi = require('joi');


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const idBudget = Joi.string();
const idCategory = Joi.string();
const title = Joi.string().alphanum().min(3).max(15);
const initialAmount = Joi.number().positive();
const currentAmount = Joi.number().positive();

const createCategoryDto = Joi.object({
    title: title.required(),
    initialAmount: initialAmount.required(),
    currentAmount: currentAmount.required(),

});
const updateCategoryDto = Joi.object({
    title: title,
    initialAmount: initialAmount,
    currentAmount: currentAmount,
});



const getCategoryIdDto = Joi.object({
    idCategory: idCategory.required(),
});

const getBudgetID = Joi.object({
    idBudget: idBudget.required(),
});


module.exports = { createCategoryDto, updateCategoryDto, getCategoryIdDto, getBudgetID };
