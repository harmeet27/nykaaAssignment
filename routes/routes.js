const productRoutes = require('./products');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });
  
  productRoutes(app, fs);
};

module.exports = appRouter;