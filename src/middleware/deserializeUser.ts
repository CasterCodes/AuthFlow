import {get} from 'lodash';
import {Request, Response, NextFunction} from 'express';
import {decode} from '../utils/jwtUtils';

import {reIssueAccessToken} from '../services/sessionService'


const deserializeUser = async (req:Request, res:Response, next:NextFunction) => {
       let userAccessToken;
      
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
              userAccessToken = req.headers.authorization.split(" ")[1];
       }
      
       if(!userAccessToken) return next();
       
       const  userRefreshToken = get(req, 'headers.x-refresh');
      
        //@ts-ignore
       const {decoded, expired} = await decode(userAccessToken);

       if(decoded) {
             // @ts-ignore
             req.user = decoded;
             return next()
       }

       if(expired && userRefreshToken) {
           const newUserAccessToken = await reIssueAccessToken(userRefreshToken);

           if(newUserAccessToken) {
               res.setHeader('x-access-token', newUserAccessToken);

               const {decoded} = await decode(newUserAccessToken);

               //@ts-ignore
               req.user = decoded;

               return next();
           }

        return next();

       }     
}

export default deserializeUser;