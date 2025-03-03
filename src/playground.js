import "./database";

import {Op} from "sequelize";
import Contact from "./app/models/contact";

import Customer from './app/models/customer';

class Playground {
    static async play() {

        const customers = await Customer.findAll({
            include: [Contact],
            where: {
                status: {
                    [Op.eq]: "ACTIVE",
                }
            }
        });

        // const customers = await Customer.findAll({
        //     attributes: { exclude: ["status"]},
        //     where: {
        //         status: {
        //             [Op.eq]: "ACTIVE",
        //         }
        //     }
        // });
        // const customers = await Customer.findByPk(3);

        // const customers = await Customer.findAll({
        //     attributes: { exclude: ["status"]},
        //     where: {
        //         id: "3"
        //     }
        // });

        // const customers = await Customer.findOne({
        //     attributes: { exclude: ["status","id"]}
        // });

        // const customers = await Customer.findAll({
        //     attributes: { exclude: ["status","id"]}
        // });

        console.log(JSON.stringify(customers, null, 2))
    }
}

Playground.play();