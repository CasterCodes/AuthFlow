import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
    email:string,
    name:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    comparePassword(candidatePassword:string): Promise<boolean>
}

const usersSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        unique:true
    }

}, {
    timestamps:true
})

usersSchema.pre('save', async function(next){
    let user = this as UserDocument;
  
         // perform this action only if the user password is modified;
        if(!user.isModified()) return next();

        let salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;

        return next();

})

usersSchema.methods.comparePassword = async function (candidatePassword:string)  {
    const user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password).catch(error => false);
}

const User = mongoose.model<UserDocument>('users', usersSchema);

export default User;