import {Icurrency} from '../interfaces/interfacesCurrency';

export class CurrencyDB implements Icurrency{ 
    private targetCurrency:string;
    private baseCurrency:string;
    private apiKey = process.env.API_EXCHANGE_KEY; 

    constructor({baseCurrency,targetCurrency}:{baseCurrency:string,targetCurrency:string}){
        this.baseCurrency = baseCurrency;
        this.targetCurrency = targetCurrency;
    }
    public async getQuoteInLocalCurrency(){ 
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${this.baseCurrency}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const rate = data.conversion_rates[this.targetCurrency];
        
            const value:number = Number(rate);
            return value;

        } catch (e) {
            throw new Error("ha ocurrido un error al obtener las conversiones, intente mas tarde");
        }
}

}
