const productRoutes = (app, fs) => {
    // variables
    const dataPath = './data/products-dataset.json';
    
    const getData = (filename, timeout = 0, statusCode = 200) => {
      return (req, res) => {
        res.statusCode = statusCode;
        setTimeout(() => fs.readFile(filename, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          let parsedData = JSON.parse(data);
          const { id } = req.query;
          if(id && id !== 'undefined'){
            parsedData = parsedData.filter((entry) => {
              console.log(entry.title, id);
              return entry.title === id
            });
            console.log('hi', parsedData);
          }
          res.send(parsedData);
        }), timeout);
      }
    }

    // READ
    app.get('/products', getData(dataPath, 1000));
  };

  module.exports = productRoutes;
  