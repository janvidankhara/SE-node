import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
           TuitController.tuitController = new TuitController();
           app.get('/tuits', TuitController.tuitController.findAllTuits);
           app.get('/users/:uid/tuits',TuitController.tuitController.findTuitsByUser);
           app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
           app.post('/tuits/:uid/', TuitController.tuitController.createTuit);
           app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
           app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }
   findAllTuits = (req: Request, res: Response) =>
       TuitController.tuitDao.findAllTuits()
           .then(tuits => res.json(tuits));
   findTuitsByUser = (req: Request, res: Response) =>
           TuitController.tuitDao.findTuitsByUser(req.params.uid)
               .then((tuits: Tuit[]) => res.json(tuits));
   findTuitById = (req: Request, res: Response) =>
           TuitController.tuitDao.findTuitById(req.params.uid)
               .then((tuit: Tuit) => res.json(tuit));
   createTuit = (req: Request, res: Response) =>
           TuitController.tuitDao.createTuit(req.params.uid, req.body)
               .then((tuit: Tuit) => res.json(tuit));
   updateTuit = (req: Request, res: Response) =>
           TuitController.tuitDao.updateTuit(req.params.uid, req.body)
               .then((status) => res.send(status));
   deleteTuit = (req: Request, res: Response) =>
           TuitController.tuitDao.deleteTuit(req.params.uid)
               .then((status) => res.send(status));
}