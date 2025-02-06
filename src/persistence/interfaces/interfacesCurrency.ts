import { Currency } from "../../LOGIC/object/currency";

export interface Icurrency{
    getQuoteInLocalCurrency({baseCurrency,targetCurrency}:{baseCurrency:string,targetCurrency:string}):Promise<number>;
    // getAllCurrencies():Promise<Currency>;
}   