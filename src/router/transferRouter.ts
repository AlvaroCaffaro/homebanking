import { Router } from "express";
import { TransferController } from "../controller/transfer";

export const transferRouter = Router();
transferRouter.get('/agenda',TransferController.get_PersonsAgenda); // quitar duplicados (cuando una persona estuvo).
transferRouter.post('/person',TransferController.get_personAccounts); // verificar error (la funcion devuelve error)
transferRouter.post('/',TransferController.find_account)
transferRouter.post('/create',TransferController.create);
