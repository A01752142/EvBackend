'use strict';

import {DataTypes, Model} from 'sequelize';
import sequelize from 'sequelize/types/sequelize';

interface RecaudacionAttributes{
  id:number,
  goal:number,
  current:number,
  status:string,
}


module.exports = (sequelize:any, DataTypes:any) => {
  class Recaudacion extends Model<RecaudacionAttributes> implements RecaudacionAttributes {
    id!:number;
    goal!:number;
    current!:number;
    status!:string; 
    
    // static associate(models:any) {
      // define association here
    //   Recaudacion.belongsToMany(models.User,{
    //     through:'ProjectUser'
    //   })
    }
  
  Recaudacion.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    goal:{
      type:DataTypes.INTEGER,
      allowNull:false      
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false      
    },
    current:{
        type:DataTypes.STRING,
        allowNull:false 
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Recaudacion;
};