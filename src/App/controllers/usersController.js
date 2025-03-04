import {Op} from "sequelize";
import * as Yup from "yup";
import {parseISO} from "date-fns";

import User from "../models/user.js"

class UsersController {
    async index(req, res) {
        const {
            name,
            email,
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

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                }
            }
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                }
            }
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                }
            }
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                }
            }
        }

        console.log(where);

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        const data = await User.findAll({
            attruburtes: {exclude: ["password","password_hash"]},
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        console.log({userId: req.userId});

        return res.json(data)
    }

    async show(req, res) {
        const user = await User.findOne({
            where: {
                customer_id: req.paramns.customerId,
                id: req.params.id,
            },
            // include: [Customer],
            attributes: { exclude: ["customer_id", "customerId"]}
        });

        // const contact = await Contact.findByPk(req.params.id, {
        //     include: [Customer] 
        // });

        if (!user) {
            return res.status(404).json();
        }
        
        const {id,name,email,createdAt,updatedAt} = user;

        return res.json({id,name,email,createdAt,updatedAt});
    }

    async create(req, res) {
        const schema = Yup.object.shape({
            name: Yup.string().required(),
            password: Yup.string().email().required().min(8),
            email: Yup.string().Email().required(),
            passwordConfirmation: Yup.String().when("password",(password, field) => {
                password ? field.required().oneOf([Yup.ref("password")]) : field;
            }),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "ERROR ON SCHEMA"})
        }

        const {id,name,email,createdAt,updatedAt} = await User.create(req.body);

        return res.status(201).json({id,name,email,createdAt,updatedAt});
    }

    async update(req, res) {
        const schema = Yup.object.shape({
            name: Yup.string(),
            email: Yup.string().Email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().email().min(8).when("oldPassword", (oldPassword, field) => {
                oldPassword ? field.required() : field
            }),
            passwordConfirmation: Yup.String().when("password",(password, field) => {
                password ? field.required().oneOf([Yup.ref("password")]) : field;
            }),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "ERROR ON SCHEMA"})
        }

        const user = await User.findByPk(req.paramns.id);

        if (!user) {
            return res.status(404).json();
        }

        const {oldPassword} = req.body;

        if(oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({error: "user password not match. "})
        }

        const {id,name,email,createdAt,updatedAt} = await User.update(req.body);

        return res.status(201).json({id,name,email,createdAt,updatedAt});
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404)
        }

        await user.destroy()

        return res.json();
    }
}

export default new UsersController();