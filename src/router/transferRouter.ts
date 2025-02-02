import { Router } from "express";
import { TransferController } from "../controller/transfer";

export const transferRouter = Router();
transferRouter.post('/',TransferController.find_account)
transferRouter.post('/create',TransferController.create);
