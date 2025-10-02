import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seed from "./app/DB/seed";

const port = 3000;

async function main() {
    try{

        await mongoose.connect(config.db_url)
        seed();
        app.listen(config.port,()=>{
            console.log(`The sports server is listening on port ${config.port}`)
        })
    }catch(err){
        console.log("Something went wrong.", err)
    }
}

main();