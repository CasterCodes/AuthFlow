import { DocumentDefinition, FilterQuery, UpdateQuery }  from 'mongoose';
import { omit } from 'lodash';
import User, { UserDocument } from '../models/userModel';
import Session, { SessionDocument } from '../models/userSessionModel';

export const signupUser =  async (userInput: DocumentDefinition<UserDocument>) => {
 try{
     return await User.create(userInput);
 } catch(error) {
     //@ts-ignore
      throw new Error(error);
 }
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
     return await User.findOne(query).lean()
}

export const validateUserPassword  = async (email:UserDocument['email'], password:string ) => {

  const user  = await User.findOne({email});

  if(!user) return false;

  const isPasswordValid = user.comparePassword(password);

  if(!isPasswordValid) return false;

  return omit(user.toJSON(), 'password');
}


export const updateUserSession = async (query: FilterQuery<UserDocument>, update: UpdateQuery<SessionDocument>) => {
     //@ts-ignore
     return await Session.updateOne(query, update);
}

