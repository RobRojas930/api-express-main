const Model = require('../model/saving.model');

class SavingService {
    // Crear un nuevo saving
    async createDB(data) {
        const saving = new Model(data);
        return await saving.save();
    }

    // Obtener todos los savings
    async findDB() {
        return await Model.find();
    }

    // Obtener un saving por ID
    async findOneDB(id) {
        return await Model.findById(id);
    }

    // Actualizar un saving por ID
    async updateDB(id, data) {
        return await Model.findByIdAndUpdate(id, data, { new: true });
    }

    // Eliminar un saving por ID
    async deleteDB(id) {
        return await Model.findByIdAndDelete(id);
    }
}

module.exports = SavingService;
