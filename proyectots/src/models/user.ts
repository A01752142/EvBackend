'use strict';

import {Model} from 'sequelize';

interface UserAttributes{
  awsCognitoId:string,
  name:string,
  role:string,
  email:string,
  recaudacion:RecaudacionAttributes
}


export enum UserRoles{
    ADMIN = 'ADMIN',
    SUPERVISOR = 'SUPERVISOR',
    AGENT = 'AGENT',
    CUSTOMER = 'CUSTOMER'
}

interface RecaudacionAttributes{
  goal:number,
  current:number,
  proposito:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    awsCognitoId!:string;
    name!:string;
    role!:string;
    email!:string;
    recaudacion!:RecaudacionAttributes;
    static associate(models:any) {
      // define association here
      User.belongsToMany(models.Project,{
        through:'ProjectUser'
      })
    }
  }
  User.init({
    awsCognitoId:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false      
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:UserRoles.CUSTOMER
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    recaudacion:{
      type:DataTypes.JSON,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export default UserAttributes;