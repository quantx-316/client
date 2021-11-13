import requests from '../features/utils/requests';
import {compURL} from '../constants';
import {CompSubmit, Comp} from '../features/types/comp';
import {padPageSearchSortURL} from '../features/utils/other';

class compService {

    static createCompetition(comp: CompSubmit) {

        console.log("create competition");
        console.log(comp);

        return requests.authPost(compURL, comp);
    }

    static updateCompetition(newComp: Comp) {
        return requests.authPut(compURL, newComp);
    }

    static deleteCompetition(compID: number) {
        const url = compURL + "?comp_id=" + compID;
        return requests.authDelete(url);
    }

    static getFinishedComps(
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
    ) {
        let url = compURL + "finished/";
        url = padPageSearchSortURL(
            url, 
            page, size, 
            attr, dir, 
            search_by, search_query, search_exclusive,
        )
        return requests.authGet(url);
    }

    static getPendingComps(
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
    ) {
        let url = compURL + "pending/";
        url = padPageSearchSortURL(
            url, 
            page, size, 
            attr, dir, 
            search_by, search_query, search_exclusive,
        )
        return requests.authGet(url);
    }

    static getCompetition(
        comp_id: number, 
    ) {
        let url = compURL + comp_id + "/";
        return requests.authGet(url);
    }

    static getEligibleBacktests(
        comp_id: number,
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
    ) {
        let url = compURL + comp_id + "/eligible-backtests/" 
        url = padPageSearchSortURL(
            url, 
            page, size, 
            attr, dir, 
            search_by, search_query, search_exclusive,
        )
        return requests.authGet(url);
    }

    static submitBacktest(
        comp_id: number, 
        backtest_id: number, 
    ) {
        let url = compURL + comp_id + "/?backtest_id=" + backtest_id;
        return requests.authPost(url);
    }

    static getCompEntries(
        comp_id: number 
    ) {
        let url = compURL + comp_id + "/entries/";
        return requests.authGet(url);
    }

    static getCompUserEntry(
        comp_id: number, 
        username: string, 
    ) {
        let url = compURL + comp_id + "/entry/?username=" + username;
        return requests.authGet(url);
    }

    static getUsersSubmittedComps(
        username: string,
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
    ) {
        let url = compURL + "submitted/";
        url = padPageSearchSortURL(
            url, 
            page, size, 
            attr, dir, 
            search_by, search_query, search_exclusive,
        )
        url = url + "&username=" + username;   
        
        console.log("GET USERS SUBMITTED COMPS");
        console.log(url);

        return requests.authGet(url);
    }

    static getAlgoSubmittedComps(
        algo_id: number, 
    ) {
        let url = compURL + "submitted/?algo_id=" + algo_id; 
        return requests.authGet(url);
    }
    
    static getBackSubmittedComps(
        backtest_id: number, 
    ) {
        let url = compURL + "submitted/?backtest_id=" + backtest_id;
        return requests.authGet(url);
    }

    static getUserOwnedComps(
        username: string, 
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string, 
        search_exclusive: boolean,
    ) {
        let url = compURL + "owned/";
        url = padPageSearchSortURL(
            url, 
            page, size, 
            attr, dir, 
            search_by, search_query, search_exclusive,
        )
        url = url + "&username=" + username;   

        return requests.authGet(url);
    }

}

export default compService; 
