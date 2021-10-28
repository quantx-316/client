export const ALGO_CREATE_SUCCESS = "ALGO_CREATE_SUCCESS";
export const ALGO_CREATE_FAIL = "ALGO_CREATE_FAIL";
export const ALGO_SAVE_SUCCESS = "ALGO_SAVE_SUCCESS";
export const ALGO_SAVE_FAIL = "ALGO_SAVE_FAIL";
export const ALGO_DELETE_SUCCESS = "ALGO_DELETE_SUCCESS";
export const ALGO_DELETE_FAIL = "ALGO_DELETE_FAIL";
export const ALGO_FETCH_SUCCESS = "ALGO_FETCH_SUCCESS";
export const ALGO_FETCH_FAIL = "ALGO_FETCH_FAIL";
export const ALGO_SELECT = 'ALGO_SELECT';

export interface AlgoSubmit {
    title: string, 
    code: string, 
}

export interface Algo {
    id: number, 
    owner: number, 
    title: string, 
    code: string, 
    created: string, 
    edited_at: string, 
}

interface AlgoSelectAction {
  type: typeof ALGO_SELECT, 
  payload: number,
}

interface AlgoCreateSuccessAction {
  type: typeof ALGO_CREATE_SUCCESS,
  payload: Algo, // algo 
}

interface AlgoCreateFailAction {
  type: typeof ALGO_CREATE_FAIL 
}

interface AlgoSaveSuccess {
  type: typeof ALGO_SAVE_SUCCESS,
  payload: Algo
}

interface AlgoSaveFail {
  type: typeof ALGO_SAVE_FAIL
}

interface AlgoDeleteSuccess {
  type: typeof ALGO_DELETE_SUCCESS,
  payload: number 
}

interface AlgoDeleteFail {
    type: typeof ALGO_DELETE_FAIL, 
}

interface AlgoFetchSuccess {
    type: typeof ALGO_FETCH_SUCCESS,
    payload: Array<Algo>
}

interface AlgoFetchFail {
    type: typeof ALGO_FETCH_FAIL
}


export type AlgoTypes = AlgoSelectAction | AlgoCreateSuccessAction | AlgoCreateFailAction | AlgoSaveSuccess | AlgoSaveFail | AlgoDeleteSuccess | AlgoDeleteFail | AlgoFetchSuccess | AlgoFetchFail
