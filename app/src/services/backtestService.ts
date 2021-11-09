import requests from '../features/utils/requests';
import {backtestURL} from '../constants'; 
import {BacktestSubmit, Backtest} from '../features/types/backtest';

class backtestService {

    static createBacktest(backtest: BacktestSubmit) {
        const url = backtestURL;
        return requests.authPost(url, backtest); 
        // backend is expecting time in unix time 
    }

    static getBacktestByAlgoID(
        algoID: number, 
        page: number, 
        size: number, 
        attr: string, 
        dir: string,
        search_by: string, 
        search_query: string,
        exclusive: boolean, 
        ) {
        const url = (
            backtestURL + 
            "?algo_id=" + algoID + 
            "&page=" + page + 
            "&size=" + size + 
            "&sort_by=" + attr + 
            "&sort_direction=" + dir +
            "&search_by=" + search_by + 
            "&search_query=" + search_query + 
            "&exclusive=" + exclusive 
        )
        return requests.authGet(url);
    }

    static getBacktestByID(backtestID: number) {
        const url = backtestURL + "?backtest_id=" + backtestID;
        return requests.authGet(url);
    }

    static deleteBacktest(backtestID: number) {
        const url = backtestURL + "?backtest_id=" + backtestID;
        return requests.authDelete(url);
    }

    static backtestLeaderboard(
        page: number, size: number, attr: string, dir: string, username_query: string
    ) {
        const url = (backtestURL + 
            "leaderboard/" + 
            "?page=" + page + 
            "&size=" + size + 
            "&sort_by=" + attr + 
            "&sort_direction=" + dir + 
            "&username_query=" + username_query
            )

        return requests.authGet(url);
    }

}

export default backtestService;