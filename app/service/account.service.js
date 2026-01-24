const Model = require('../data/models/account.model');

class AccountService {
    // Crear una nueva cuenta
    async createDB(data) {
        const account = new Model(data);
        return await account.save();
    }

    // Obtener todas las cuentas de un usuario
    async findByUserId(userId) {
        return await Model.find({ userId });
    }

    // Obtener una cuenta por su ID
    async findOneDB(id) {
        return await Model.findById(id);
    }

    // Actualizar una cuenta por su ID
    async updateDB(id, data) {
        return await Model.findByIdAndUpdate(id, data, { new: true });
    }

    // Eliminar una cuenta por su ID
    async deleteDB(id) {
        return await Model.findByIdAndDelete(id);
    }
}

module.exports = AccountService;
