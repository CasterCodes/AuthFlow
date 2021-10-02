import {LeanDocument, FilterQuery } from 'mongoose';
import {UserDocument} from '../models/userModel';
import Session, {SessionDocument} from '../models/userSessionModel';
import { sign , decode} from '../utils/jwtUtils';
import {findUser} from '../services/authService';

const createrUserSession = async (userId: string, userAgent:string) => {
   const session = await Session.create({user:userId, userAgent});
   return session.toJSON();
}

const createUserAccessToken  = async (user:LeanDocument<Omit<UserDocument, 'password'>> | LeanDocument<Omit<SessionDocument, 'password'>>, session:LeanDocument<Omit<SessionDocument, 'password'>> | LeanDocument<Omit<UserDocument, 'password'>>) => {
   const accessToken = await sign({...user, session:session._id}, {expiresIn: 15});
   return accessToken;
}


const reIssueAccessToken = async (token:string) => {
 
    //@ts-ignore
   const {decoded, valid, expired} = await decode(token);

   //@ts-ignore
   if(!decoded || !decoded._id) return false;

   // get session
    //@ts-ignore
   const session = await Session.findById(decoded._id);
   //@ts-ignore

   if(!session && !session?.valid) return false;

   const user = await findUser({_id: session.user});

   if(!user) return false;

   const userAccessToken = createUserAccessToken(user, session);

   return userAccessToken;
}

const findSessions = async (query:FilterQuery<SessionDocument>) => {
     return await Session.find(query).lean();
}

export {createrUserSession, createUserAccessToken, reIssueAccessToken, findSessions}