'use strict';

import {Model} from 'sequelize';

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
    proposito!:string;
    static associate(models:any){
      Recaudacion.belongsToMany(models.User,{
        through:"RecaudacionUser"
      })
    }
   
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
    },
    current:{
        type:DataTypes.STRING,
        allowNull:false 
    }
  }, {
    sequelize,
    modelName: 'Recaudacion',
  });
  return Recaudacion;
};

export default RecaudacionAttributes