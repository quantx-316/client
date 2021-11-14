import requests from '../features/utils/requests';
import {quotesTimeURL, quotesIntervalsURL, quotesSymbolsURL} from '../constants'; 

class quoteService {

    static getAllowedTimes() {
        return requests.authGet(quotesTimeURL);
    }

    static getIntervals() {
        return requests.authGet(quotesIntervalsURL);
    }

    static getStocks() {
        return requests.authGet(quotesSymbolsURL);
    }

}

export default quoteService;