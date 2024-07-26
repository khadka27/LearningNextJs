import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); //! typescript maa kunai pani data aauxa nai vanera suerity dina lai
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Monogodb connected");
    });

    connection.on("error", (err) => {
      console.log("Error on connecting MongoDb" + err);
      process.exit;
    });
  } catch (error) {
    console.log("Something went wrong on DB");
    console.log(error);
  }
}
