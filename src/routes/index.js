const express = require('express');

const opportunitiesController = require('../controllers/opportunitiesController');

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).json({
    title: 'Backend Test - LinkApi',
    endpoints: [
      {
        route: '[GET] /opportunities',
        description:
          'Return the opportunities from db grouped and ordered by date',
      },
      {
        route: '[GET] /opportunities/client',
        description:
          'Return the opportunities from db grouped and ordered by orgName',
      },
      {
        route: '[GET] /opportunities/:client_name',
        description:
          'Return the opportunities from db for a specific client(customer)',
      },
    ],
  });
});

router.get('/opportunities', opportunitiesController.index);
router.get('/opportunities/client', opportunitiesController.indexClient);
router.get('/opportunities/:clientName', opportunitiesController.findClient);

module.exports = router;
