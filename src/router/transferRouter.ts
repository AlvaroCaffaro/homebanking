import { Router } from "express";
import { TransferController } from "../controller/transfer";

export const transferRouter = Router();
transferRouter.get('/agenda',TransferController.get_PersonsAgenda);
transferRouter.post('/person',TransferController.get_personAccounts);
transferRouter.post('/',TransferController.find_account)
transferRouter.post('/create',TransferController.create);
