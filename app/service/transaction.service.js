const boom = require('@hapi/boom');
const Model = require('../data/models/transaction.model');
const { CategoryModel } = require('../data/models/category.model');
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

        for (let i = 0; i < transactionDB.length; i++) {
            let categoryBudget = await CategoryModel.findOne({ _id: transactionDB[i].category[0].id, userId: transactionDB[i].userId });
            if (!categoryBudget) {
                transactionDB[i].category = {
                    categoryId: '',
                    name: 'General',
                    description: 'General category',
                    color: '#000000',
                    icon: 'default-icon',
                };
                await transactionDB[i].save();
            }

        }

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
        const { title, amount, date, category, description, type } = changes;
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
        transaction.category = category;
        transaction.description = description;
        transaction.type = type;
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
                { $match: { userId: userId, "category.name": category.name, type: 'expense', ...filterData } },
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

    async getHistoryTransactions(userId, filter = {}) {

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


        const transactions = await Model.find({ userId: userId })
            .sort({ date: -1 });


        const totalExpenseByMonth = await Model.aggregate([
            { $match: { userId: userId, type: 'expense', ...filterData } }
            ,
            { $group: { _id: { month: { $month: "$date" }, year: { $year: "$date" } }, total: { $sum: "$amount" } } },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);

        const totalIncomeByMonth = await Model.aggregate([
            { $match: { userId: userId, type: 'income', ...filterData } }
            ,
            { $group: { _id: { month: { $month: "$date" }, year: { $year: "$date" } }, total: { $sum: "$amount" } } },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);


        const countTransactions = transactions.length;
        const totalTransactionsAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

        const countTransactionsByMonth = await Model.aggregate([
            {
                $match: { userId: userId, ...filterData }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                    count: { $sum: 1 },
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);

        const totalTransactionsByMonth = await Model.aggregate([
            {
                $match: { userId: userId, ...filterData }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                    totalAmount: { $sum: "$amount" },
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ]);




        const transactionsByCategory =
            await Model.aggregate([
                {
                    $match: { userId: userId, ...filterData }
                },
                {
                    $group: {
                        _id: "$category.name",
                        color: { $first: "$category.color" },
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$amount" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        color: 1,
                        count: 1,
                        totalAmount: 1
                    }
                },
                { $sort: { totalAmount: -1 } }
            ]);

        // Transformar el resultado para que category sea un string directo
        const formattedTransactionsByCategory = transactionsByCategory.map(item => ({
            category: Array.isArray(item.category) ? item.category[0] : item.category,
            count: item.count,
            color: Array.isArray(item.color) ? item.color[0] : item.color,
            totalAmount: item.totalAmount
        }));


        return {
            countTransactions: countTransactions,
            totalTransactionsAmount: totalTransactionsAmount,

            totalExpenseByMonth: totalExpenseByMonth[0] ? totalExpenseByMonth[0].total : 0,
            totalIncomeByMonth: totalIncomeByMonth[0] ? totalIncomeByMonth[0].total : 0,

            countTransactionsByMonth: countTransactionsByMonth[0] ? countTransactionsByMonth[0].count : 0,
            totalTransactionsByMonth: totalTransactionsByMonth[0] ? totalTransactionsByMonth[0].totalAmount : 0,

            transactionsByCategory: formattedTransactionsByCategory,
        }

    }
}

module.exports = TransactionService;