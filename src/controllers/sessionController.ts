
import {Request, Response, NextFunction} from 'express';
import {validateUserPassword, updateUserSession} from '../services/authService';
import {createrUserSession, createUserAccessToken, findSessions} from '../services/sessionService';
import {sign} from '../utils/jwtUtils';
import {get} from 'lodash'


const createSessionHandler = async (req: Request, res: Response, next:NextFunction) => {
        // validate user email and password
          const user = await validateUserPassword(req.body.email, req.body.password );

          if(!user)  return res.status(401).json({message:"Invalid username or password"});

        // create user session;
          const session = await createrUserSession(user._id, req.get("user-agent") || "");

        // create user Access Token

        const userAccessToken = await createUserAccessToken(user, session);

        // create refresh token

         const userRefreshToken = await sign(session, {expiresIn: '365d'})

        // send

       return res.status(200).json({userAccessToken, userRefreshToken});
}
 const invalidateUserSessionHandler = async (req:Request, res:Response, next: NextFunction) => {
         const sessionId = get(req, "user.session");

         await updateUserSession({_id:sessionId}, {valid:false});

         return res.sendStatus(200);
}



const getUserSessionsHandler = async (req:Request, res:Response, next:NextFunction) => {
    const userId = get(req, 'user._id');

    const sessions = await findSessions({user: userId, valid:true});

    res.status(200).json({sessions});
}

export {createSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler};