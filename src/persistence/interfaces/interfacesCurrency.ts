export interface Icurrency{
    getQuoteInLocalCurrency({baseCurrency,targetCurrency}:{baseCurrency:string,targetCurrency:string}):Promise<number>;
}