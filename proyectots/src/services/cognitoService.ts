import AWS from 'aws-sdk';
import { COGNITO_APP_CLIENT_ID,COGNITO_APP_SECRET_HASH,AWS_REGION } from '../config';
import crypto from 'node:crypto';
import RecaudacionModel from '../modelsNOSQL/recaudacionNOSQL';
import { v4 as uuidv4} from 'uuid';

type CognitoAttributes = 'email' |'name'|'phone_number';

class CognitoService{
    //Conexión a cognito
    private config: AWS.CognitoIdentityServiceProvider.ClientConfiguration;
    private cognitoIdentity:AWS.CognitoIdentityServiceProvider;

    //Conexión a la acplicación
    private clientId = COGNITO_APP_CLIENT_ID;
    private secretHash = COGNITO_APP_SECRET_HASH;

    //Singleton
    private static instance:CognitoService;
    public static getInstance():CognitoService{
        if(this.instance){
            return this.instance;
        }
        this.instance= new CognitoService();
        return this.instance;
    }

    private constructor(){
        this.config = {
            region: AWS_REGION,
        }
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
    }
    public generateUserId(): string {
        return uuidv4();
        }
    //Registro
    public async signUpUser(email:string,password:string, userAttr:{Name:CognitoAttributes;Value:string}[]){
        const params={
            ClientId:this.clientId,
            Password:password,
            Username:email,
            SecretHash:this.hashSecret(email),
            UserAttributes:userAttr,
        }
        
        return await this.cognitoIdentity.signUp(params).promise();
    }

    //Autenticación
    public async signInUser(email:string,password:string){
        const params={
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId:this.clientId,
            AuthParameters:{
                USERNAME:email,
                PASSWORD:password,
                SECRET_HASH: this.hashSecret(email)
            }
        };
        return await this.cognitoIdentity.initiateAuth(params).promise();
    }
    
    public async createRecaudacion(proposito:string,meta:number){
        const id=this.generateUserId();
        try{
            const Backo= new RecaudacionModel({
                id:id,
                proposito:proposito,
                meta:meta,
                current:0
            });
            console.log("AQui si llega");
            const result=await Backo.save()
            console.log("Amo la comida")
            console.log(result)
            return result
                        
        }catch(error){
            console.error("EERRORRR")
        }

        
    }

    //Verificación de usuarios
    public async verifyUser(email:string,code:string){
        const params ={
            ClientId:this.clientId,
            ConfirmationCode:code,
            Username:email,
            SecretHash: this.hashSecret(email)
        }
        return await this.cognitoIdentity.confirmSignUp(params).promise();
    }

    //TODO: funcionalidades necesarias de cognito

    private hashSecret(username:string):string{
        return crypto
            .createHmac('SHA256', this.secretHash)
            .update(username + this.clientId)
            .digest('base64');
    }

    // public async donacion(id:string,current:number,[]){
    //     const params={
    //         Id:id,
    //         Amount:current,
    //     }
    //     return await this.donacion(params).promise();
    // }

}

export default CognitoService;

