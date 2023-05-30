import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import { v4 as uuidv4 } from 'uuid';
import RecaudacionModel from "../modelsNOSQL/recaudacionNOSQL";
import db from "../models";

class RecaudacionController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }
    
    public generateUserId(): string {
    return uuidv4();
    }

    //Singleton
    private static instance:RecaudacionController;
    public static getInstance():AbstractController{
        //si existe la instancia la regreso
        if(this.instance){
            return this.instance;
        }
        //si no exite la creo
        this.instance = new RecaudacionController('recaudacion');
        return this.instance;
    } 

    //Configurar las rutas del controlador
    protected initRoutes(): void {
        this.router.post("/donacion",this.makeDonation.bind(this));
        this.router.post("/configurar",this.configureGoal.bind(this));
        this.router.get("/totalDonaciones", this.getTotalDonations.bind(this));
    }

    //Los métodos asociados a las rutas
    private makeDonation(req:Request,res:Response){
        res.status(200).send("Servicio en línea  😄");
    }
    private async configureGoal(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
        /*const {goal,proposito} = req.body;
        await RecaudacionModel.create({
            id:this.generateUserId,
            current:0,
            status:"prueba",
            proposito:proposito,
            goal:goal
        })
        await db['Recaudacion'].create({
            id:this.generateUserId,
            current:0,
            status:"prueba",
            proposito:proposito,
            goal:goal
        })
        res.status(200).send({message:"Recaudacion exitosa"})
    }
    */
    }
    private  getTotalDonations(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }

    private configureGoal(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }

    private getTotalDonations(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }
}

export default RecaudacionController;