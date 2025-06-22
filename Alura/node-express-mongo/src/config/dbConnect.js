import mongoose from "mongoose";

async function connectaNoBancoDeDados() {
  mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.blmpoas.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0"
  );

  return mongoose.connection;
}

export default connectaNoBancoDeDados;
