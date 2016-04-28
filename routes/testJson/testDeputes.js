const express = require('express');
const deputesJson = require('../../datas/deputes/AMO10_deputes_actifs_mandats_actifs_organes_XIV');

const router = express.Router();

router.get('/deputesJson/:name', (req, res) => {
  console.log(deputesJson, req.params.name);
  var deputes = deputesJson.export.acteurs.acteur.find( a => {
    return a.etatCivil.ident.nom === req.params.name;
  });
  if (deputes ) {
    res.json(deputes);
  }else {
    res.json("not found");
  }
})


module.exports = router;
