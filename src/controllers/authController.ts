
import {Request, Response, NextFunction} from 'express';
import {signupUser} from '../services/authService';
import {omit} from 'lodash';

const signupUserController = async (req: Request, res: Response, next:NextFunction) => {
     try {
            const user = await signupUser(req.body);
        return res.status(201).send(omit(user.toJSON(), 'password'));
         
     } catch (error) {
           // @ts-ignore
           return res.status(409).json({message:'An error occured', error:error.message})
     }
}

export {signupUserController};