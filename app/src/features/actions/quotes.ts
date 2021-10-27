import quoteService from "../../services/quoteService";
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import {getErrorMsg} from '../utils/other';

export const fetchQuoteInterval = (dispatch: any, minDateCallBack: any, maxDateCallBack: any) => {

    return quoteService.getInterval().then(
        (res) => {

            const data = res.data;
            //@ts-ignore
            const minDate = data['min_time'];
            //@ts-ignore
            const maxDate = data['max_time'];
            minDateCallBack(new Date(minDate));
            maxDateCallBack(new Date(maxDate));

            return Promise.resolve(res.data);
        },
        (error) => {
            const msg = getErrorMsg(error);

            console.log(msg);

            dispatchErrorMsg(dispatch, "Failed to fetch quote min/max times");

            return Promise.reject();
        }
    )
    
}
