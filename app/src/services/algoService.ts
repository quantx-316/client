import requests from '../features/utils/requests';
import {algoURL} from '../constants'; 
import {AlgoSubmit, Algo} from '../features/types/algos';

class algoService {

    static createAlgo(algo: AlgoSubmit) {
        const url = algoURL; 
        return requests.authPost(url, algo);
    }

    static updateAlgo(newAlgo: Algo) {
        const url = algoURL; 
        return requests.authPut(url, newAlgo)
    }

    static deleteAlgo(algoID: number) {
        const url = algoURL + "?algo_id=" + algoID;
        return requests.authDelete(url);
    }

    static getAlgos() {
        const url = algoURL + "all/";
        return requests.authGet(url);
    }

}

export default algoService;