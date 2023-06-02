import dynamodb from "../services/dynamoService";
import joi from 'joi';
import { PREFIX_TABLE } from "../config";

const RecaudacionModel = dynamodb.define('recaudacion',{
hashKey:'awsCognitoId',
   schema:{
    id: joi.string().required(),
    current:joi.number().required(),
   //  status:joi.string().required(),
    goal:joi.number().required(),
    proposito:joi.string().required()
   },
   tableName:`Recaudacion${PREFIX_TABLE}`,
//    indexes:[
//     {
//         hashKey:'email',
//         name:"EmailIndex",
//         type:'global'
//     }
//    ] 
});
export default RecaudacionModel;