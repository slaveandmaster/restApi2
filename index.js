const express = require("express");
const dotenv = require("dotenv");
const initDb = require("./config/database");
const userRouter = require("./routes/users");
const AuthRouter = require("./routes/authorization");
const carRouter = require("./routes/cars");
const rentRouter = require("./routes/rentCar");
const brandsRouter = require("./routes/brands");
const typeRouter = require("./routes/types");
const cors = require("./middleware/cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extends: true,
  })
);
initDb(app);
app.use(cors());
//entry route
app.get("/", async (req, res) => {
  res.json({ message: "rent a car rest api server require login " });
});
app.use("/api/brand", brandsRouter);
app.use("/api/type", typeRouter);
app.use("/api", userRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/cars", carRouter);
app.use("/api/rent", rentRouter);
app.listen(process.env.PORT, () => console.log("Listening on port 3000"));
