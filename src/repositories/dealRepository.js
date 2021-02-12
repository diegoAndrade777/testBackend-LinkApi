const Deal = require('../models/Deal');

module.exports = {
  async createOpportunity(orders) {
    const orderedOrders = await orders.map(
      async ({ numero, idPedido, value, orgName }) => {
        const deal = await Deal.create({
          numero,
          idPedido,
          value,
          orgName,
        });
        return deal;
      }
    );
    return orderedOrders;
  },

  async findClient(client) {
    const clientExists = Deal.find({
      orgName: client,
    });

    return clientExists;
  },

  async sortOpportunitiesPerDate() {
    const orders = await Deal.aggregate([
      {
        $sort: {
          value: -1,
          numero: 1,
        },
      },
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
          opportunities: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
    return orders;
  },

  async sortOpportunitiesPerClient() {
    const orders = await Deal.aggregate([
      {
        $sort: {
          value: -1,
          numero: 1,
        },
      },
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
          _id: '$orgName',
          opportunities: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
    return orders;
  },
};
