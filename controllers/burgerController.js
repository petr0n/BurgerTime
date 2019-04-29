let express = require('express');
let router = express.Router();

let burger = require('../models/burger.js');

router.get('/', function(req, res) {
  burger.all(function(data) {
    var hbsObj = {
      burgers: data
    };
    // console.log(hbsObj);
    res.render('index', hbsObj);
  });
});

router.post('/api/add', function(req, res) {
  burger.create([
    'burgerName', 'devoured'
  ], [
    req.body.burgerName, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/burger/:id', function(req, res) {
  let condition = 'id = ' + req.params.id;
  let val = req.body.devoured ? true : false;
  // console.log('condition', condition);
  burger.update({ devoured: val }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
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
