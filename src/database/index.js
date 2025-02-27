import { Sequelize } from "sequelize";
import config from '../config/database'

import Customer from "../app/models/customer";
import Contact from "../app/models/contact";
import User from "../app/models/user";

const models = [Customer, Contact, User]

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }
}

export default new Database();