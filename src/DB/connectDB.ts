import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_url as string)
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("ERROR in connection With DB ");
    });
};

export default connectDB;
