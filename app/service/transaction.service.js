const Boom = require('@hapi/boom');
const Model = require('../model/transaction.model');

const TransactionService = {
    async createDB(data) {
        const model = new Model(data);
        model.save();
        return data;
    },

    async findDB() {
        let transactionDB = await Model.find(filter);
        transactionDB = limit
            ? transactionDB.filter((item, index) => item && index < limit)
            : transactionDB;
        if (transactionDB == undefined || transactionDB == null)
            throw boom.notFound('No se encontro catalogo');
        else if (transactionDB.length <= 0)
            throw boom.notFound('No se encontro ningún registro');
        return transactionDB;
    },

    async findOneDB(id) {
        const transaction = await Model.findOne({
            _id: id,
        });
        if (transaction == undefined || transaction == null)
            throw boom.notFound('No se encontro catalogo');
        else if (transaction.length <= 0)
            throw boom.notFound('No se encontro ningún registro');
        return transaction;
    },

    async updateDB(id, changes) {
        let transaction = await Model.findOne({
            _id: id,
        });
        let transactionOriginal = transaction;
        const { title, amount, date } = changes;
        transaction.title = title;
        transaction.amount = amount;
        transaction.date = date;
        transaction.save();

        return {
            original: transactionOriginal,
            actualizado: transaction,
        };
    },

    async deleteDB(id) {
        let transaction = await Model.findOne({
            _id: id,
        });
        const { deletedCount } = await Model.deleteOne({
            _id: id,
        });
        if (deletedCount <= 0)
            throw boom.notFound('El registro seleccionado no existe');
        return transaction;
    },
};

module.exports = TransactionService;