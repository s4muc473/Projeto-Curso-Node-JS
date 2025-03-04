import Sequelize, {Model} from "sequelize";

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            // provider: Sequelize.BOOLEAN, PARA QUE O SISTEMA N FIQUE PROCURANDO-O
        },
        {
            sequelize,
            name: {
                singular: "user",
                plural: "users"
            }
        }
        );
    }
}

export default User;