import { Request,Response } from "express";
import AbstractController from "./AbstractController";

class CreadorController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }
        
    //Singleton
    private static instance:CreadorController;
    public static getInstance():AbstractController{
        //si existe la instancia la regreso
        if(this.instance){
            return this.instance;
        }
        //si no exite la creo
        this.instance = new CreadorController('user');
        return this.instance;
    } 

    //Configurar las rutas del controlador
    protected initRoutes(): void {
        this.router.get("/readUsers",this.getReadUsers.bind(this));
        this.router.post("/createUser",this.postCreateUser.bind(this));
    }

    //Los métodos asociados a las rutas
    private getReadUsers(req:Request,res:Response){
        res.status(200).send("Servicio en línea  😄");
    }

    private postCreateUser(req:Request,res:Response){
        res.status(200).send("Registro exitoso");
    }
}

export default CreadorController;