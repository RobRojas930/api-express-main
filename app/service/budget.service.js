
const boom = require('@hapi/boom');

const Model = require('../data/models/budget.model');

class BudgetService {
    async findDB(limit, filter = {}) {
        let budgetDB = await Model.find(filter);
        budgetDB = limit
            ? budgetDB.filter((item, index) => item && index < limit)
            : budgetDB;
        if (budgetDB == undefined || budgetDB == null)
            throw boom.notFound('No se encontro catalogo');
        else if (budgetDB.length <= 0)
            throw boom.notFound('No se encontro ningún registro');
        return budgetDB;
    }

    async findOneDB(id) {
        const budget = await Model.findOne({
            _id: id,
        });
        if (budget == undefined || budget == null)
            throw boom.notFound('No se encontro catalogo');
        else if (budget.length <= 0)
            throw boom.notFound('No se encontro ningún registro');
        return budget;
    }

    async createDB(data) {
        const budget = new Model(data);
        await budget.save();
        return data;
    }

    async updateDB(id, changes) {
        let budget = await Model.findOne({
            _id: id,
        });
        let budgetOriginal = budget;
        const { title, initialAmount, currentAmount } = changes;
        budget.title = title;
        budget.initialAmount = initialAmount;
        budget.currentAmount = currentAmount;
        budget.save();

        return {
            original: budgetOriginal,
            actualizado: budget,
        };
    }


    async deleteDB(id) {
        let budget = await Model.findOne({
            _id: id,
        });
        const { deletedCount } = await Model.deleteOne({
            _id: id,
        });
        if (deletedCount <= 0)
            throw boom.notFound('El registro seleccionado no existe');
        return budget;
    }
}

module.exports = BudgetService;