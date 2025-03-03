import Customer from "../models/customer";
import Contact from "../models/contact";
import {Op} from "sequelize";
import * as Yup from "yup";
import {passeISO} from "date-fns";

class ConstactsController {
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = { customer_id: req.params.customerId };
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            }
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            }
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                },
            }
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: createdBefore,
                }
            }
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: createdAfter,
                }
            }
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: updatedBefore,
                }
            }
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: updatedAfter,
                }
            }
        }

        console.log(where);

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id","status"],
                    required: true,
                }
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.json(data)
    }

    async show(req, res) {
        const contact = await Contact.findByPk(req.params.id);

        if (!contact) {
            return res.status(404).json();
        }

        return res.json(customer);
    }

    async create(req, res) {
        const schema = Yup.object.shape({
            name: Yup.string().required(),
            email: Yup.strin().Email().required(),
            status: Yup.string().uppercase(), // OPCIONAL POIS O SEU DEFAULT É ATIVO
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "ERROR ON SCHEMA"})
        }

        const customer = await Customer.create(req.body);

        return res.status(201).json(customer);
    }

    async update(req, res) {
        const schema = Yup.object.shape({
            name: Yup.string(), // OPCIONAL
            email: Yup.strin().Email(), // OPCIONAL
            status: Yup.string().uppercase(), // OPCIONAL POIS O SEU DEFAULT É ATIVO
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "ERROR ON SCHEMA"})
        }
        
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }

        await customer.update(req.body);

        return res.json(customer);
    }

    async destroy(req, res) {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }

        await customer.destroy();

        return res.json();   
    }
}

export default new ConstactsController();