const express = require('express');
const boom = require('@hapi/boom');
const UserService = require('../service/user.service');
const service = new UserService();
const TransactionService = require('../service/transaction.service');
const transactionService = new TransactionService();
const { getTransactionIdDto } = require('../data/dtos/transaction.dto');
const validatorHandler = require('./middlewares/validator.handler');
const { encrypt, compare } = require('../utils/password.handler');
const { signToken } = require('../utils/jwt.handler');
const { loginDto, registerDto } = require('../data/dtos/user.dto');

const router = express.Router();



router.get('/', async (req, res, next) => {
  try {
    const { limit } = req.query;
    const filter = req.body;
    const data = await service.findDB(limit, filter);
    res.json({
      success: true,
      message: 'Listo',
      data: data,
    });
  } catch (error) {
    next(error);
  }
});


//SE USA NEXT PARA ACCEDER AL SIGUIENTE MIDDLEWARE
router.post(
  '/register',
  validatorHandler(registerDto, 'body'),
  async (req, res, next) => {
    try {
      const password = await encrypt(req.body['password']);
      const bodyInsert = { ...req.body, password };
      const dataUser = await service.createDB(bodyInsert);

      res.json({
        success: true,
        token: await signToken(dataUser),
        message: 'Se ha registrado correctamente',
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  validatorHandler(loginDto, 'body'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await service.findOneDB({ email: email }); //FILTRO SELECT DEL PASSWORD
      if (!user) {
        throw boom.notFound('No se encontro usuario');
      }
      const hashPassword = user.get('password'); //NO SE PUEDE ACCEDER DIRECTAMENTE A LA PROPIEDAD
      const check = await compare(password, hashPassword);
      if (!check) {
        throw boom.unauthorized('No se encontro usuario');
      }
      user.set('password', undefined, { strict: false });
      res.json({
        success: true,
        token: await signToken(user),
        data: user,
        message: 'Usuario logeado',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/dashboard/:id', validatorHandler(getTransactionIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const filter = req.query;
      const dataDashboard = await transactionService.getDataDashboard(id, filter);
      res.json({
        success: true,
        message: 'Listo',
        data: dataDashboard,
      });
    }
    catch (error) {
      next(error);
    }
  });



router.get('/history/:id', validatorHandler(getTransactionIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const filter = req.query;
      const historyData = await transactionService.getHistoryTransactions(id, filter);
      res.json({
        success: true,
        message: 'Listo',
        data: historyData,
      });
    }
    catch (error) {
      next(error);
    }
  });


module.exports = router;
