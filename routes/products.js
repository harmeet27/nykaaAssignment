const productRoutes = (app, fs) => {
    // variables
    const dataPath = './data/products-dataset.json';

    const paginatedResults = (filename, timeout = 0) => {
      return (req, res, next) => {
        setTimeout(() => fs.readFile(filename, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          let parsedData = JSON.parse(data);
          const title = req.query.id;
          let filteredData = parsedData;
          if(title && title !== 'undefined'){
          filteredData = parsedData.filter((entry) => entry.title == title)
          }
          const page =  parseInt(req.query.page);
          const limit =  parseInt(req.query.limit);

         const startIndex = (page - 1) * limit;
         const endIndex = page * limit;

        const results = {};

        if(endIndex < filteredData.length){
          results.next = {
            page: page + 1,
            limit
          }
        }

        if(startIndex > 0){
          results.previous = {
            page: page - 1,
            limit
          }
        }

        const numOfRecord =  filteredData.length - page * limit
        results.numOfRecordsLeft = numOfRecord;
        results.results = filteredData.slice(startIndex, endIndex);
        res.paginatedResults = results;
        next();
        }), timeout);
      }
    }
    
    const getData = (statusCode = 200) => {
      return (req, res) => {
        res.statusCode = statusCode;
        res.json(res.paginatedResults);
      }
    }

    // READ
    app.get('/products', paginatedResults(dataPath, 1000), getData());
  };

  module.exports = productRoutes;
  