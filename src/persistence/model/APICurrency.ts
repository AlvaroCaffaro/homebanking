import { EnvCofig } from '../../env.config';
import {Icurrency} from '../interfaces/interfacesCurrency';

export class CurrencyDB implements Icurrency{ 

    private apiKey = EnvCofig.exchange_key;

    public async getQuoteInLocalCurrency({baseCurrency,targetCurrency}:{baseCurrency:string,targetCurrency:string}){ 
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${baseCurrency}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(data.result != 'success') throw Error();
            const rate = data.conversion_rates[targetCurrency];
        
            const value:number = Number(rate);
            return value;

        } catch (e) {
            throw new Error("ha ocurrido un error al obtener las conversiones, intente mas tarde");
        }
}

}
