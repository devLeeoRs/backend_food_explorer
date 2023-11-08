const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DeliveryController {
  async update(request, response) {
    const { order_id, status } = request.body;

    const [data] = await knex("delivery").where({ order_id });

    if (!data) {
      throw new AppError("Nenhum pedido encontrado");
    }

    data.status = status;
    await knex("delivery").update(data).where({ order_id });

    response.json({ message: "Status alterado ✅" });
  }
}

module.exports = DeliveryController;
