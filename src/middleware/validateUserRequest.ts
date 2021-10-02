import {Request, Response, NextFunction} from 'express';
import {AnySchema} from 'yup';


const validateUserRequest = (schema: AnySchema) => async (req:Request, res:Response, next: NextFunction) => {
     try {
         await schema.validate({
             body:req.body,
             query:req.query,
             params:req.params,
         })

         return next();
         
     } catch (error:unknown) {
         // @ts-ignore
         return res.status(400).json({message:'error occured', error:error})
     }
}


export default validateUserRequest;