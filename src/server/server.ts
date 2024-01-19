import express, { json } from "express"
import Route from "../app/routes/routes";

const app = express();


app.use(json());
app.use(Route);



app.listen(3000, () => {
    console.log("Server Online!")
})

