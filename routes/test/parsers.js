const express = require('express');
const deputesParser = require('../../services/parsers/deputes');

const router = express.Router();

router.get('/deputes', (req, res) => {
  deputesParser.parse().then(result => {
    res.json(result);
  });
})

module.exports = router;
