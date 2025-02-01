import poolPostreSQL from "../connection";
import { PostreSQLAccount } from "../persistence/model/PostgreAccount";
import {CurrencyDB } from '../persistence/model/APICurrency'
import { TransferCreator } from "./service/TransferCreator";
import { AccountManager } from "./service/AccountManager";

const databaseAccount = new PostreSQLAccount(poolPostreSQL);
const databaseCurrency = new CurrencyDB();

export const accountManager = new AccountManager({accountPersistence:databaseAccount}); 
export const transferCreator = new TransferCreator({accountPersistence: databaseAccount,currencyPersistence: databaseCurrency});
