import express, { json } from "express"
import produtos from "../app/routes/produtosRoutes";
import entrada from "../app/routes/entradaRoutes";
import saida from "../app/routes/saidaRoutes";

const app = express();


app.use(json());

app.use(produtos);
app.use(entrada);
app.use(saida);



app.listen(3000, () => {
    console.log("Server Online!")
})

