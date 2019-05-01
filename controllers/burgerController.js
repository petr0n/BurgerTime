let express = require('express');
let router = express.Router();

let burger = require('../models/burger.js');

router.get('/', function(req, res) {
  burger.all(function(data) {
    var hbsObj = {
      burgers: data
    };
    res.render('index', hbsObj);
  });
});

router.post('/api/add', function(req, res) {
  burger.create([
    'burgerName', 'devoured'
  ], [
    req.body.burgerName, req.body.devoured
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put('/api/burger/:id', function(req, res) {
  let id = req.params.id;
  let val = req.body.devoured ? true : false;
  burger.update({ devoured: val }, id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete('/api/delete/:id',  function(req, res) {
  burger.delete(req.params.id, function(result){
    res.status(200).end();
  });
});


module.exports = router;
