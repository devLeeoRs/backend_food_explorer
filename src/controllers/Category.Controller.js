const knex = require("../database/knex");

class CategoryController {
  async index(request, response) {
    const category = await knex("category").groupBy("name");

    response.json(category);
  }
}

module.exports = CategoryController;
