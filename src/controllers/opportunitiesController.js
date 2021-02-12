const apiPipeDrive = require('../utils/apiPipeDrive');
const { apiToken } = require('../config/pipeDriveConfs');

const dealRepository = require('../repositories/dealRepository');

const createOrderService = require('../service/createOrder');

module.exports = {
  async index(request, response) {
    try {
      const dealsWon = await apiPipeDrive.get(
        `/deals?status=won&start=0&api_token=${apiToken}`
      );

      const { data } = dealsWon.data;
      const orders = await createOrderService.execute(data);

      await dealRepository.createOpportunity(orders);

      const orderedOrders = await dealRepository.sortOpportunitiesPerDate();

      return response.status(200).json(orderedOrders);
    } catch (error) {
      console.log(error);
    }
  },
  async indexClient(request, response) {
    try {
      const data = await dealRepository.sortOpportunitiesPerClient();
      return response.status(200).json(data);
    } catch (err) {
      return response.status(404).json(err.message);
    }
  },
  async findClient(request, response) {
    try {
      const { clientName } = request.params;

      const client = await dealRepository.findClient(clientName);

      if (!client) {
        return response.status(404).json({ error: 'Customer does not exist!' });
      }

      return response.status(200).json(client);
    } catch (err) {
      return response.status(400).json(err.meessage);
    }
  },
};
