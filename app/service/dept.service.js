const Model = require('../data/models/dept.model');

class DeptServiceDB {
  async createDB(data) {
    const dept = new Model(data);
    return await dept.save();
  }

  async findAllDB(query = {}) {
    return await Model.find(query);
  }

  async findOneDB(id) {
    return await Model.findById(id);
  }

  async updateDB(id, data) {
    return await Model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteDB(id) {
    return await Model.findByIdAndDelete(id);
  }
}

module.exports = DeptServiceDB;
