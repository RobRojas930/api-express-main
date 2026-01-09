const boom = require('@hapi/boom');
const Model = require('../data/models/transaction.model');

class TransactionService {
    constructor() { }

    async createDB(data) {
        const newData = {
            title: data.title,
            description: data.description,
            amount: data.amount,
            date: data.date,
            type: data.type,
            category: {
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
        let transactionDB = await Model.find(filter);
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
        let transaction = await Model.findOne({ _id: id });
        const transactionOriginal = { ...transaction._doc };
        const { title, amount, date } = changes;
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
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
}

module.exports = TransactionService;