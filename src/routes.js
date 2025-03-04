// direciona as rotas para o controller especifico
import { Router } from "express";
import sessions from "./App/controllers/sessionsController.js"
import customers from "./App/controllers/customersController.js";
import contacts from "./App/controllers/contactsController.js";
import users from "./App/controllers/usersController.js"

import auth from "./App/middlewares/auth.js";


const routes = new Router();

// SESSIONS - LIVRE ACESSO
routes.post("/sessions", sessions.create);

// CONTROLA O ACESSO A PARTIR DESSE PONTO
routes.use(auth);

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

// USERS
routes.get("/users", users.index);
routes.get("/users/:id",users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);


export default routes;
