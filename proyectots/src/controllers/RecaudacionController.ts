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
    this.router.get("/totalDonaciones",this.authMiddleware.verifyToken,this.totalDonaciones.bind(this));
  }

  async donacion(req: Request, res: Response) {
    const { email, creador, donacion } = req.body;
    try {
      await db["User"].increment("monto", {
        by: donacion,
        where: { name: creador },
      });

      return res.status(200).send({
        message: `Donacion recibida`,
      }).end();
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: "error en donacion" });
    }
  }

  async configurar(req: Request, res: Response) {
    const { email, proposito, goal } = req.body;
    // const recaudacion=await this.cognitoService.createRecaudacion(proposito,meta)
    const id=this.generateUserId();
    try {
        const Backo= new RecaudacionModel({
            id:id,
            proposito:proposito,
            goal:goal,
            current:0
        });
        console.log("72")
        // Backo.save();
        console.log("74")
        await db["User"].update(
        { recaudacion: Backo},
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

  async totalDonaciones(req: Request, res: Response) {
    const { email } = req.body;
    const monto = await db["User"].findOne({
      attributes: ["current"],
      where: { email: email },
    });
    const meta = await db["User"].findOne({
      attributes: ["recaudacion.goal"],
      where: { name: email },
    });
    res.status(200).send(`Total Donaciones: ${monto.dataValues.monto}`);
  }
}

export default RecaudacionController;