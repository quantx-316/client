import {logout} from '../actions/auth';
import { dispatchErrorMsg } from './notifs';

export const getErrorMsg = (error: any) => {
    let msg = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    return msg;
}

export const handleError = (error: any, dispatch: any) => {

    console.log("HANDLE ERROR");
    console.log(error.response);

    if (!error.response) {
        // network error 
        return 
    } 

    // if (error.response && error.response.status === 401) {
    //     dispatch(logout());
    // }

}

export const genericErrorHandler = (error: any, dispatch: any) => {

    const msg = getErrorMsg(error);

    handleError(error, dispatch);

    dispatchErrorMsg(dispatch, msg);

}

export const padSortURL = (
    url: string, 
    attr: string, 
    dir: string, 
) => {
    return url + "&sort_by=" + attr + "&sort_direction=" + dir;
}

export const padSearchURL = (
    url: string, 
    search_by: string, 
    search_query: string, 
    search_exclusive?: boolean, 
) => {

    let newURL = url + "&search_by=" + search_by + "&search_query=" + search_query;
    if (search_exclusive !== null) {
        newURL = newURL + "&exclusive=" + search_exclusive;
    }

    return newURL;
}   

export const padSearchSortURL = (
    url: string,
    attr: string, 
    dir: string, 
    search_by: string, 
    search_query: string, 
    search_exclusive?: boolean, 
) => {
    return padSearchURL(
        padSortURL(
            url, 
            attr, dir, 
        ),
        search_by, search_query, search_exclusive
    )
}

export const padPageSearchSortURL = (
    url: string, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
) => {
    let newURL = url + "?page=" + page + "&size=" + size; 

    newURL = padSearchSortURL(
        newURL, 
        attr, dir, 
        search_by, search_query, search_exclusive
    )
    return newURL; 
}
