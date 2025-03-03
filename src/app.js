import express from "express";
import routes from "./routes.js";

import "./database"

console.log('teste')

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    // permitem que a requirição passe para a proxima etapaou não
    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server;