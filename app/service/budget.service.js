
const boom = require('@hapi/boom');

const Model = require('../data/models/budget.model');
const TransactionModel = require('../data/models/transaction.model');

class BudgetService {
    async findDB(limit, filter = {}) {

        let filterData = { ...filter };
        if (filter != {}) {
            if (filter['startDate'] && filter['endDate']) {
                const fechaInicio = new Date(filter['startDate']);
                const fechaFin = new Date(filter['endDate']);
                filterData.date = { $gte: fechaInicio, $lte: fechaFin };
                delete filterData.startDate;
                delete filterData.endDate;
            }
            if (filter['userId']) {
                filterData.userId = filter['userId'];
            }
        }

        let budgetDB = await Model.find(filterData);
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

    async getBudgetData(filter = {}) {
        let filterData = { ...filter };
        if (filter != {}) {
            if (filter['startDate'] && filter['endDate']) {
                const fechaInicio = new Date(filter['startDate']);
                const fechaFin = new Date(filter['endDate']);
                filterData.date = { $gte: fechaInicio, $lte: fechaFin };
                delete filterData.startDate;
                delete filterData.endDate;
            }
            if (filter['userId']) {
                filterData.userId = filter['userId'];
            }

        }

        const budgets = await Model.find({ ...filterData });
        for (const budget of budgets) {
            // Buscar todas las transacciones de tipo expense del usuario
            const transactions = await TransactionModel.find({
                userId: budget.userId,
                type: 'expense',
                ...filterData
            }).lean();

            // Filtrar por categoryId usando optional chaining
            const transactionsByCategoryId = transactions.filter(t => {
                // Verificar si category es array o objeto
                const categoryId = t.category[0]?.categoryId.toString() || t.category?.categoryId?.toString();
                return categoryId === budget.categoryId;
            });

            const totalAmount = transactionsByCategoryId.reduce((acc, curr) => acc + curr.amount, 0);

            budget.currentAmount = budget.initialAmount - totalAmount;
            budget.percentage = ((budget.initialAmount - budget.currentAmount) / budget.initialAmount * 100).toFixed(2);

            await budget.save();
        }

        return budgets;
    }
}

module.exports = BudgetService;