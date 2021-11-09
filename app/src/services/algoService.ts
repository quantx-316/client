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

    static getAlgos(
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
        ) {
        const url = (
            algoURL + "all/" + 
            "?page=" + page + 
            "&size=" + size + 
            "&sort_by=" + attr + 
            "&sort_direction=" + dir + 
            "&search_by=" + search_by + 
            "&search_query=" + search_query + 
            "&exclusive=" + search_exclusive
        );
        return requests.authGet(url);
    }

    static getPublicAlgos(
        username: string, 
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        code_query: string, 
        ) {
        const url = (
            algoURL + "public/" + 
            "?username=" + username + 
            "&page=" + page + 
            "&size=" + size + 
            "&sort_by=" + attr +
             "&sort_direction=" + dir +
             "&code_query=" + code_query
        )
        return requests.authGet(url);
    }

}

export default algoService;