import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/testRoute";

// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/testdb',{
//     useNewUrlParser:true
// });

mongoose
  .connect("mongodb://10.1.169.82:27017/testdb")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection error:", err));

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js project with express and mongo db",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/testRoute.js"] // Path to your API routes
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
routes(app);
/**
 * @swagger
 * /:
 *   get:
 *       summary: Returns a sample message
 *       responses:
 *          200:
 *             description: A successful response
 */
app.get("/", (req, res) => {
  res.send(`node and express are running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
