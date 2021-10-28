import quoteService from "../../services/quoteService";
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import {getErrorMsg} from '../utils/other';

const moment = require('moment');

export const fetchQuoteAllowedTimes = (dispatch: any, minDateCallBack: any, maxDateCallBack: any) => {

    return quoteService.getAllowedTimes().then(
        (res) => {

            const data = res.data;
            //@ts-ignore
            let minDate = data['min_time'];
            //@ts-ignore
            let maxDate = data['max_time'];

            minDate = moment.utc(minDate).toDate();
            maxDate = moment.utc(maxDate).toDate();

            minDateCallBack(minDate);
            maxDateCallBack(maxDate);

            return Promise.resolve(data);
        },
        (error) => {
            const msg = getErrorMsg(error);

            console.log(msg);

            dispatchErrorMsg(dispatch, "Failed to fetch quote min/max times");

            return Promise.reject();
        }
    )
    
}

export const fetchQuoteIntervals = (dispatch: any, intervalsCallBack: any) => {

    return quoteService.getIntervals().then(
        (res) => {

            const data = res.data;

            intervalsCallBack(data);

            return Promise.resolve(data);
        },
        (error) => {
            const msg = getErrorMsg(error);

            console.log(msg);

            dispatchErrorMsg(dispatch, "Failed to fetch quote min/max times");

            return Promise.reject();
        }
    )

} 