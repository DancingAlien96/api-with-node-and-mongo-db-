const mongoose = require('mongoose');



const dbConnect = async ()=>{
    const MONGO_URL = process.env.MONGO_URL


    try {
        await mongoose.connect(MONGO_URL, 
            );

        console.log("Data Base connected.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }

    


}


module.exports= dbConnect