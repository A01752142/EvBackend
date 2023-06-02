'use strict';

import {Model} from 'sequelize';

interface RecaudacionUserAttributes{
  RecaudacionId:string,
  UserId:string
}


module.exports = (sequelize:any, DataTypes:any) => {
  class RecaudacionUser extends Model<RecaudacionUserAttributes> implements RecaudacionUserAttributes {
    RecaudacionId!: string;
    ProjectId!:string;
    UserId!:string;
    static associate(models:any) {
      // define association here      
    }
  }
  RecaudacionUser.init({
    RecaudacionId:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'Recaudacion',
        key:'id'
      }
    },
    UserId:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
      references:{
        model:'User',
        key:'awsCognitoId'
      }      
    },
  }, {
    sequelize,
    modelName: 'RecaudacionUser',
  });
  return RecaudacionUser;
};