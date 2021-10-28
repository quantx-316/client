import requests from '../features/utils/requests';
import {quotesTimeURL, quotesIntervalsURL} from '../constants'; 

class quoteService {

    static getAllowedTimes() {
        return requests.authGet(quotesTimeURL);
    }

    static getIntervals() {
        return requests.authGet(quotesIntervalsURL);
    }

}

export default quoteService;