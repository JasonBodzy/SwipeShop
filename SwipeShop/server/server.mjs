import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import CreateAccount from "./routes/user/CreateAccount.mjs";
import login from "./routes/user/login.mjs";



const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/CreateAccount", CreateAccount);
app.use("/login", login);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
