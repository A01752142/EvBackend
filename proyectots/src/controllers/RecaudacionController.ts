import { Request, Response } from "express";
import { v4 as uuidv4} from 'uuid';
import db from "../models";
import AbstractController from "./AbstractController";


// import RecaudacionAttributes from "../models/recaudacion"
import RecaudacionModel from "../modelsNOSQL/recaudacionNOSQL";
class RecaudacionController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  //Singleton
  private static instance: RecaudacionController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RecaudacionController("recaudacion");
    return this.instance;
  }
  public generateUserId(): string {
    return uuidv4();
    }
  
  protected initRoutes(): void {
    this.router.post("/donacion",this.authMiddleware.verifyToken,this.donacion.bind(this));
    this.router.post("/configurar",this.authMiddleware.verifyToken,this.configurar.bind(this));
    this.router.post("/totalDonaciones",this.authMiddleware.verifyToken,this.totalDonaciones.bind(this));
  }

  async donacion(req: Request, res: Response) {
    const { email, donacion } = req.body;
    try {
      await db["User"].increment("recaudacion", {by: donacion,where: { email: email },});

      return res.status(200).send({message: `Donacion recibida`}).end();
    } catch (error: any) {
    res.status(500).send({ code: error.code, message: "error en donacion" });
    }
  }

  async totalDonaciones(req: Request, res: Response) {
    const { email } = req.body;
    const donaciones_totales = await db["User"].findOne({attributes: ["recaudacion"],where: { email: email },});
    res.status(200).send(`Total Donaciones: ${donaciones_totales.dataValues.recaudacion}`);
  }

async configurar(req: Request, res: Response) {
    const { email, proposito, goal } = req.body;
    // const recaudacion=await this.cognitoService.createRecaudacion(proposito,meta)
    const id=this.generateUserId();
    try {
        await db["User"].update(
        { goal: goal,proposito:proposito},
        {
          where: {
            email: email,
          },
        }
      );
      return res.status(200).send({ message: `Actualizacion Exitosa` });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: "error en generarUserId"});
    }
  }

}

export default RecaudacionController;