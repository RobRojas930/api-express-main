const boom = require('@hapi/boom');
const Model = require('../data/models/transaction.model');
const CategoryService = require('./categories.service');
const categoryService = new CategoryService();

class TransactionService {
    constructor() { }

    async createDB(data) {
        const newData = {
            title: data.title,
            description: data.description,
            amount: data.amount,
            date: data.date,
            type: data.type,
            userId: data.userId,
            category: {
                categoryId: data.category?.id,
                name: data.category?.name || 'General',
                description: data.category?.description || 'General category',
                color: data.category?.color || '#000000',
                icon: data.category?.icon || 'default-icon',
            },
        }
        const model = new Model(newData);
        await model.save();
        return model;
    }




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
        let transactionDB = await Model.find(filterData);
        transactionDB = limit
            ? transactionDB.filter((item, index) => item && index < limit)
            : transactionDB;
        if (transactionDB == undefined || transactionDB == null)
            throw boom.notFound('No se encontro catalogo');
        else if (transactionDB.length <= 0)
            throw boom.notFound('No se encontro ningún registro');
        return transactionDB;
    }

    async findOneDB(id) {
        const transaction = await Model.findOne({ _id: id });
        if (transaction == undefined || transaction == null)
            throw boom.notFound('No se encontro catalogo');
        return transaction;
    }

    async updateDB(id, changes) {
        id = id.toString().replace(/[^a-zA-Z0-9]/g, '');
        let transaction = await Model.findOne({ _id: id });
        const transactionOriginal = { ...transaction._doc };
        const { title, amount, date, category, description } = changes;
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
        transaction.category = category;
        transaction.description = description;
        await transaction.save();

        return {
            original: transactionOriginal,
            actualizado: transaction,
        };
    }

    async deleteDB(id) {
        let transaction = await Model.findOne({ _id: id });
        const { deletedCount } = await Model.deleteOne({ _id: id });
        if (deletedCount <= 0) throw boom.notFound('El registro seleccionado no existe');
        return transaction;
    }

    async getDataDashboard(userId, filter = {}) {

        let filterData = { ...filter };

        if (filter != {}) {
            if (filter['startDate'] && filter['endDate']) {
                const fechaInicio = new Date(filter['startDate']);
                const fechaFin = new Date(filter['endDate']);
                filterData.date = { $gte: fechaInicio, $lte: fechaFin };
                delete filterData.startDate;
                delete filterData.endDate;
            }
        }


        const totalIncome = await Model.aggregate([
            {
                $match: {
                    userId: userId, type: 'income',
                    ...filterData
                }
            },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Model.aggregate([
            { $match: { userId: userId, type: 'expense', ...filterData } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalSaved = totalIncome[0] && totalExpense[0] ? totalIncome[0].total - totalExpense[0].total : 0;

        const totalTransactions = await Model.countDocuments({ userId: userId });
        const totalAmount = await Model.aggregate([
            { $match: { userId: userId, ...filterData } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const categories = await categoryService.findDB(0, { userId: userId });
        const categoriesData = [];
        const totalExpenses = await Model.find({ userId: userId, type: 'expense', ...filterData });
        const totalExpensesAmount = totalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        for (const category of categories) {
            const totalByCategory = await Model.aggregate([
                { $match: { userId: userId, "category.name": category.name, ...filterData } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            categoriesData.push({
                category: category.name,
                color: category.color,
                icon: category.icon,
                total: totalByCategory[0] ? totalByCategory[0].total : 0,
                totalExpensesAmount: totalExpensesAmount,
                percentage: totalExpensesAmount > 0 ? ((totalByCategory[0] ? totalByCategory[0].total : 0) / totalExpensesAmount * 100).toFixed(2) : 0
            });
        }


        return {
            totalTransactions: totalTransactions,
            totalAmount: totalAmount[0] ? totalAmount[0].total : 0,
            totalIncome: totalIncome[0] ? totalIncome[0].total : 0,
            totalExpense: totalExpense[0] ? totalExpense[0].total : 0,
            totalSaved: totalSaved,
            categories: categoriesData,
        };
    }
}

module.exports = TransactionService;