import userService from '../../services/userService';
import { getErrorMsg, handleError, genericErrorHandler } from "../utils/other";

export const fetchUser = (username: string, callBack: any) => (dispatch: any) => {

    return userService.getUser(username).then(
        (res) => {
            callBack(res.data);
        },
        (error) => {
            genericErrorHandler(error, dispatch);
        }
    )

}
