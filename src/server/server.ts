import express from "express"

const app = express();

app.use(express());

app.listen(3000, () => {
    console.log("Server Online!")
})

