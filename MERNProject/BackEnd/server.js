// import express
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {connectDB} from './config/db.js';
import productRoute from './routes/product.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json()); // allows us to accept JSON

// app.use((req, res, next) => {
//   console.log("REQ", req.method, req.path);
//   next();
// });

app.use("/api/sapwoodg18/products", productRoute)

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.resolve(__dirname, "FrontEnd", "dist", "index.html"));
    })
}

// listen event set at port number 5000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server has started at http://localhost:${PORT}`);
});
