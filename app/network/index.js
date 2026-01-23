const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const storageRouter = require('./storage.router');
const postRouter = require('./post.router');
const promoRouter = require('./promo.router');
const userRouter = require('./user.router');
const budgetRouter = require('./budget.router');
const transactionRouter = require('./transaction.router');
const savingRouter = require('./saving.router');
const accountRouter = require('./account.router');
const deptRouter = require('./dept.router');
const templateRouter = require('./template.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/storage', storageRouter);
  router.use('/post', postRouter);
  router.use('/promo', promoRouter);
  router.use('/user', userRouter);
  router.use('/budget', budgetRouter);
  router.use('/transaction', transactionRouter);
  router.use('/saving', savingRouter);
  router.use('/account', accountRouter);
  router.use('/dept', deptRouter);
  router.use('/template', templateRouter);




}

module.exports = routerApi;
