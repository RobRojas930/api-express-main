// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const { Model } = require('./../data/models/category.model');

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
    const model = new Model(newData);
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
    let categoriesDB = await Model.find(filter);
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
    const category = await Model.findOne({
      _id: id,
    });
    if (category == undefined || category == null)
      throw boom.notFound('No se encontro catalogo');
    else if (category.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return category;
  }

  async updateDB(id, changes) {
    let category = await Model.findOne({
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

    return {
      original: categoryOriginal,
      actualizado: category,
    };
  }

  async deleteDB(id) {
    let category = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return category;
  }
}

module.exports = CategoryService;
