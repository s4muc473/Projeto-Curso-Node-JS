import express from "express";
// import authMiddleware from "./App/middlewares/auth.js"
import routes from "./routes.js";

import "./database"

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    // permitem que a requirição passe para a proxima etapaou não
    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({extended: false}));
        // this.server.use(authMiddleware);
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server;