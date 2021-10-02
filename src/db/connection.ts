import mongoose from 'mongoose';

const url:string = '';

 const connection = async () => {
    try {
     await mongoose.connect(url, {});
      console.log(
          "Connected to the datebase"
      )
        
    } catch (error) {
        console.log(`Connection Error: ${error}`);
        process.exit(1);
    }
}

export default connection;