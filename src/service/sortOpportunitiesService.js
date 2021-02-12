const Deal = require('../models/Deal');

module.exports = {
  async execute() {
    const orders = Deal.aggregate([
      {
        $project: {
          numero: '$numero',
          idPedido: '$idPedido',
          value: '$value',
          orgName: '$orgName',
          date: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } },
        },
      },
      {
        $group: {
          _id: '$date',
          transactions: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
    return orders;
  },
};
