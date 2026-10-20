
require("dotenv").config();
const {requestRoutes}=require('../backend/routes/requestRoutes')
const express = require("express");
const connectDb = require("./config/connectDb");

const app = express();

app.use(express.json());

app.use('/api/requests', requestRoutes);
const startServer = async () => {
  await connectDb();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
