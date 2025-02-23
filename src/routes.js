// direciona as rotas para o controller especifico
const { Router } = require('express');
const routes = new Router();

const customers = require("./App/controllers/customersController");

routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

module.exports = routes;
