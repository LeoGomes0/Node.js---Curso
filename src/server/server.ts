import express, { json } from "express"
import Route from "../app/routes/produtosRoutes";
import router from "../app/routes/entradaRoutes";

const app = express();


app.use(json());
app.use(Route);
app.use(router);



app.listen(3000, () => {
    console.log("Server Online!")
})

