import { Request,Response } from "express";
import AbstractController from "./AbstractController";

class RecaudacionController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
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
        this.router.get("/recaudacion/donacion",this.makeDonation.bind(this));
        this.router.post("/recaudacion/configurar",this.configureGoal.bind(this));
        this.router.post("/recaudacion/totalDonaciones", this.getTotalDonations.bind(this));
    }

    //Los métodos asociados a las rutas
    private makeDonation(req:Request,res:Response){
        res.status(200).send("Servicio en línea  😄");
    }

    private configureGoal(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }

    private getTotalDonations(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }
}

export default RecaudacionController;