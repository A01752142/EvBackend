'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const sequelize_1 = require("sequelize");
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["SUPERVISOR"] = "SUPERVISOR";
    UserRoles["AGENT"] = "AGENT";
    UserRoles["CUSTOMER"] = "CUSTOMER";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
            User.belongsToMany(models.Project, {
                through: 'ProjectUser'
            });
        }
    }
    User.init({
        awsCognitoId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: UserRoles.CUSTOMER
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
