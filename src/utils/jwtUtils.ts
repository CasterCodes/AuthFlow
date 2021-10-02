import jwt from 'jsonwebtoken';


const sign = async (object:Object, options?:jwt.SignOptions | undefined) => {
    return await jwt.sign(object, 'kevinProgramms', options);
}


const decode = async (token:string) => {
    
     try { 
        const decoded = await jwt.verify(token, 'kevinProgramms');
        return {valid:true, expired:false, decoded}
     } catch (error) {
         // @ts-ignore
         return {valid:false, expired:error.message === 'jwt expired', decoded:null}
     }
}


export {sign, decode}