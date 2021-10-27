import requests from '../features/utils/requests';
import {quotesTimeURL} from '../constants'; 

class quoteService {

    static getInterval() {
        return requests.authGet(quotesTimeURL);
    }

}

export default quoteService;