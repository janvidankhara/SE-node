import express, {Request, Response} from 'express';
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://janvidankhara:janvi%4025@cluster0.luchw.mongodb.net/tuiter?retryWrites=true&w=majority');
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

const app = express();
app.use(express.json());
app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);