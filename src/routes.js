// direciona as rotas para o controller especifico
import { Router } from "express";
import customers from "./app/controllers/customersController.js"
import contacts from "./app/controllers/contaController.js"


const routes = new Router();

// CUSTOMERS
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// CONTACTS
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/conrtacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);


export default routes;
