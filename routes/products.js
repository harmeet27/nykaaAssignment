const productRoutes = (app, fs) => {
    // variables
    const dataPath = './data/products-dataset.json';
    
    const getData = (filename, timeout = 0, statusCode = 200) => {
      return (req, res) => {
        res.statusCode = statusCode;
        setTimeout(() => fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
    
          res.send(JSON.parse(data));
        }), timeout);
      }
    }

    // READ
    app.get('/products', getData(dataPath, 1000));
  };

  module.exports = productRoutes;
  