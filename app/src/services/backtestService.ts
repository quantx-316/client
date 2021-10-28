import requests from '../features/utils/requests';
import {backtestURL} from '../constants'; 
import {BacktestSubmit, Backtest} from '../features/types/backtest';

class backtestService {

    static createBacktest(backtest: BacktestSubmit) {
        const url = backtestURL;
        return requests.authPost(url, backtest); 
        // backend is expecting time in unix time 
    }

    static getBacktestByAlgoID(algoID: number) {
        const url = backtestURL + "?algo_id=" + algoID;
        return requests.authGet(url);
    }

    static deleteBacktest(backtestID: number) {
        const url = backtestURL + "?backtest_id=" + backtestID;
        return requests.authDelete(url);
    }

}

export default backtestService;