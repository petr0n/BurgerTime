let express = require('express');
let router = express.Router();

let burger = require('../models/burger.js');

router.get('/', function(req, res) {
  burger.all(function(data) {
    var hbsObj = {
      burgers: data
    };
    console.log(hbsObj);
    res.render('index', hbsObj);
  });
});

router.post('/api/cats', function(req, res) {
  burger.create([
    'burgerName', 'devoured'
  ], [
    req.body.burgerName, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  let id = 'id = ' + req.params.id;

  console.log('burger id:', id);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


router.delete('/api/delete/:id',  function(req, res) {
  let id = 'id = ' + req.params.id;

  burger.delete(id, function(result){
    res.status(200).end();
  });
});


module.exports = router;
