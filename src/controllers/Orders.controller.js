const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  async create(request, response) {
    const {
      details,
      status,
      payment,
      description,
      address,
      statusDelivery,
      descriptionDelivery,
      total_price,
    } = request.body;
    const id = request.user.id;

    const [order_id] = await knex("orders").insert({
      details,
      status,
      payment,
      description,
      user_id: id,
      total_price,
    });

    await knex("delivery").insert({
      address,
      status: statusDelivery,
      description: descriptionDelivery,
      order_id,
    });

    response.json({ message: "Pedido Enviado" });
  }
  async update(request, response) {
    const { status, order_id } = request.body;

    const [order] = await knex("orders").where({ id: order_id });
    order.status = status;
    await knex("orders").update(order).where({ id: order_id });

    if (status == "Liberado Entrega") {
      const [delivery] = await knex("delivery").where({ order_id });
      delivery.status = status;
      await knex("delivery").update(delivery).where({ order_id });
    }

    response.json({ message: "success" });
  }
  async show(request, response) {
    const user_id = request.user.id;

    const order = await knex("orders").where({ user_id }).orderBy("id");

    if (!order) {
      throw new AppError("Nenhuma pedido encontrado");
    }

    response.json(order);
  }
  async index(request, response) {
    const order = await knex("orders").orderBy("id");

    if (!order) {
      throw new AppError("Nenhuma pedido encontrado");
    }

    response.json(order);
  }
}

module.exports = OrdersController;
