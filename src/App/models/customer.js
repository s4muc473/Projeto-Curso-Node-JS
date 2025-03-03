import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            status: Sequelize.ENUM('ACTIVE', 'ARCHIVED')
            },
            {
                sequelize,
                timestamps: true,  
                createdAt: 'create_at',  
                updatedAt: 'update_at',
            },
            {
                scopes: {
                    actives: {
                        where: {
                            status: "ACTIVE",
                        },
                        order: ["create_at"],
                    },
                    hooks: {
                        beforeValidate: (customer, options) => {
                            customer.status = "ARCHIVED";
                        }
                    },
                    dev: {
                        where: {
                            name: "Dev Samurai",
                        },
                    },
                    created(date) {
                        return {
                            where: {
                                create_at: {
                                    [Op.gte]: date
                                },
                            }
                        }
                    }
                },
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Contact);
    }
}

export default Customer;