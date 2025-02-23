const express = require('express');
const routes = require('./routes.js')

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

module.exports = new App().server;