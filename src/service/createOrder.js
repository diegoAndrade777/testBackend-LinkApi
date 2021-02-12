const jsonxml = require('jsontoxml');
const { generate } = require('gerador-validador-cpf');

const apiBling = require('../utils/apiBling');
const { apiKey } = require('../config/blingConfs');

module.exports = {
  async execute(deals) {
    const orders = deals.map(async (deal) => {
      const xmlObject = jsonxml(
        {
          pedido: [
            {
              name: 'cliente',
              children: [
                { name: 'nome', text: deal.org_id.name || 'diegoAndrade777' },
                {
                  name: 'cpf_cnpj',
                  text: generate(),
                },
                { name: 'ie', text: 'ISENTO' },
                { name: 'endereco', text: 'Rua Jose Papp' },
                { name: 'numero', text: '100' },
                { name: 'bairro', text: 'Barra do Rio Cerro' },
                { name: 'cep', text: '89260-100' },
                { name: 'cidade', text: 'Jaragua do Sul' },
                { name: 'uf', text: 'SC' },
              ],
            },
            {
              name: 'volumes',
              children: [
                {
                  name: 'volume',
                  children: [{ name: 'servico', text: 'Sedex' }],
                },
              ],
            },
            {
              name: 'itens',
              children: [
                {
                  name: 'item',
                  children: [
                    { name: 'codigo', text: 1 },
                    { name: 'descricao', text: 'Desenvolvimento de Software' },
                    { name: 'qtde', text: 1 },
                    { name: 'vlr_unit', text: deal.value || 0 },
                  ],
                },
              ],
            },
            {
              name: 'parcelas',
              children: [
                {
                  name: 'parcela',
                  children: [{ name: 'vlr', text: deal.value || 0 }],
                },
              ],
            },
          ],
        },
        false
      );

      const dataOrder = await apiBling.post(
        `/pedido/json/&apikey=${apiKey}&xml=${xmlObject}`
      );
      const { pedido } = dataOrder.data.retorno.pedidos[0];

      pedido.value = deal.value;
      pedido.orgName = deal.org_id.name;

      return pedido;
    });

    const OrdersCreated = Promise.all(orders).then((resultOrderPromise) => {
      return resultOrderPromise;
    });
    return OrdersCreated;
  },
};
