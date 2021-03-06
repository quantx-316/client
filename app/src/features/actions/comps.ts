import compService from '../../services/compService';
import { Comp, CompSubmit } from '../types/comp';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../utils/notifs';
import { getErrorMsg, handleError, genericErrorHandler } from "../utils/other";


export const createCompetition = (comp: CompSubmit, createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.createCompetition(comp).then(
        (res) => {
            dispatchSuccessMsg(dispatch, "Successfully created competition");

            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const updateCompetition = (comp: Comp, createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.updateCompetition(comp).then(
        (res) => {
            dispatchSuccessMsg(dispatch, "Successfully updated competition");

            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const deleteCompetition = (compID: number, createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.deleteCompetition(compID).then(
        (res) => {
            dispatchSuccessMsg(dispatch, "Successfully deleted competition");
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}


export const getFinishedComps = (
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, 
    createFailCallBack?: any
) => (dispatch: any) => {

    return compService.getFinishedComps(
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}


export const getPendingComps = (
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, 
    createFailCallBack?: any
) => (dispatch: any) => {

    return compService.getPendingComps(
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getCompetition = (compID: number, createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.getCompetition(compID).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getEligibleBacktests = (
    comp_id: number, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, 
    createFailCallBack?: any
) => (dispatch: any) => {

    return compService.getEligibleBacktests(
        comp_id, 
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getCompetitionEntries = (
    compID: number, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.getCompEntries(
        compID,
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getUserEntryToComp = (compID: number, username: string, createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.getCompUserEntry(compID, username).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getUsersSubmittedComps = (
    username: string, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, 
    createFailCallBack?: any) => (dispatch: any) => {

    return compService.getUsersSubmittedComps(
        username,
        page, 
        size,
        attr, 
        dir,
        search_by,
        search_query,
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const getAlgoSubmittedComps = (
    algoID: number, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.getAlgoSubmittedComps(
        algoID,
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}


export const getBackSubmittedComps = (
    backID: number, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, createFailCallBack?: any) => (dispatch: any) => {

    return compService.getBackSubmittedComps(
        backID,
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}


export const getUserOwnedComps = (
    username: string, 
    page: number, 
    size: number, 
    attr: string, 
    dir: string,
    search_by: string, 
    search_query: string, 
    search_exclusive: boolean,
    createCallBack?: any, 
    createFailCallBack?: any
    ) => (dispatch: any) => {

    return compService.getUserOwnedComps(
        username,
        page, 
        size, 
        attr, 
        dir,
        search_by, 
        search_query, 
        search_exclusive,
    ).then(
        (res) => {
            if (createCallBack) {
                createCallBack(res.data);
            }
        },
        (err) => {
            if (createFailCallBack) {
                createFailCallBack();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}

export const submitBacktest = (
    compID: number, 
    backtestID: number, 
    callBack?: any, 
    failCallback?: any, 
) => (dispatch: any) => {

    return compService.submitBacktest(
        compID, backtestID
    ).then(
        (res) => {
            if (callBack) {
                callBack(res.data);
            }

            dispatchSuccessMsg(dispatch, "Successfully submitted backtest");

        },
        (err) => {
            if (failCallback) {
                failCallback();
            }
            genericErrorHandler(err, dispatch);
        }
    )

}
