// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const { CategoryModel } = require('./../data/models/category.model');
const BudgetModel = require('../data/models/budget.model');
const TransactionModel = require('../data/models/transaction.model');
const mongoose = require('mongoose');

class CategoryService {
  constructor() { }

  async createDB(data) {
    const newData = {
      categoryId: data.categoryId || '',
      name: data.name || 'General',
      description: data.description || 'General category',
      color: data.color || '#000000',
      icon: data.icon || 'default-icon',
      userId: data.userId,
    }
    const model = new CategoryModel(newData);
    model.save();
    return newData;
  }

  async findDB(limit, filter) {
    let filterData = { ...filter };
    if (filter != {}) {
      if (filter['userId']) {
        filterData.userId = filter['userId'];
      }
    }
    let categoriesDB = await CategoryModel.find(filter);
    categoriesDB = limit
      ? categoriesDB.filter((item, index) => item && index < limit)
      : categoriesDB;
    if (categoriesDB == undefined || categoriesDB == null)
      throw boom.notFound('No se encontro catalogo');
    else if (categoriesDB.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return categoriesDB;
  }

  async findOneDB(id) {
    const category = await CategoryModel.findOne({
      _id: id,
    });
    if (category == undefined || category == null)
      throw boom.notFound('No se encontro catalogo');
    else if (category.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return category;
  }

  async updateDB(id, changes) {
    let category = await CategoryModel.findOne({
      _id: id,
    });
    let categoryOriginal = {
      name: category.name,
      id: category.id,
      categoryId: category.categoryId,
      description: category.description,
      color: category.color,
      icon: category.icon,
      userId: category.userId,
    };
    const { name, categoryId, description, color, icon, userId } = changes;
    category.name = name;
    category.categoryId = categoryId;
    category.description = description;
    category.color = color;
    category.icon = icon;
    category.userId = userId;
    category.save();

    //Si se encuentra alguna categoria vinculada a transacciones actualizar dicha categoria
    const transactionsToUpdate = await TransactionModel.find({ "category.id": new mongoose.Types.ObjectId(id), userId: category.userId });
    for (let i = 0; i < transactionsToUpdate.length; i++) {
      transactionsToUpdate[i].category = {
        id: category._id,
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
      };
      await transactionsToUpdate[i].save();
    }

    return {
      original: categoryOriginal,
      actualizado: category,
    };
  }

  async deleteDB(id) {
    let category = await CategoryModel.findOne({ _id: id });

    // Revisar si esa categoria ha sido ligada a algún presupuesto o transacción
    const budgetWithCategory = await BudgetModel.find({ categoryId: id, userId: category.userId });
    const transactionWithCategory = await TransactionModel.find({ "category.id": new mongoose.Types.ObjectId(id), userId: category.userId });
    if (budgetWithCategory.length > 0 || transactionWithCategory.length > 0) {
      throw boom.conflict('No se puede eliminar la categoría porque está asociada a un presupuesto o transacción.');
    }

    const { deletedCount } = await CategoryModel.deleteOne({ _id: id });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return category;
  }
}

module.exports = CategoryService;
