import { Router } from "express";
import { TransferController } from "../controller/transfer";

export const transferRouter = Router();

transferRouter.post('/destination',TransferController.set_destination);
transferRouter.post('/amount',TransferController.set_amount);
transferRouter.post('/confirm',TransferController.create);