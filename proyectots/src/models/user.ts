'use strict';

import {Model} from 'sequelize';

interface UserAttributes{
  awsCognitoId:string,
  name:string,
  role:string,
  email:string,
  recaudacion:number,
  goal:number,
  proposito:string
  //   id:string,
  //   goal:number,
  //   current:number,
  //   proposito:string
  // }
}


export enum UserRoles{
    ADMIN = 'ADMIN',
    SUPERVISOR = 'SUPERVISOR',
    AGENT = 'AGENT',
    CUSTOMER = 'CUSTOMER'
}

interface RecaudacionAttributes{
  id:string
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
    recaudacion!:number;
    goal!:number;
    proposito!:string;
    static associate(models:any) {
      // define association here
      
      User.belongsToMany(models.Recaudacion,{
        through:'RecaudacionUser'
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
       type:DataTypes.DECIMAL(8,2),
       allowNull:true,
       defaultValue:0
     },
     goal:{
      type:DataTypes.DECIMAL(8,2),
      allowNull:true,
     },
     proposito:{
      type:DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export default UserAttributes;